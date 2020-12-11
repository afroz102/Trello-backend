const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET || '545245452454ewewe2secterekkdldk';

exports.register = async (req, res) => {
    try {
        // console.log('req.body', req.body);
        const { email, password, passwordCheck, name } = req.body;

        // validate 
        if (!email || !password || !passwordCheck || !name) {
            return res.status(400).json({ msg: "Please fill all the fields." });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Password do not matches." });
        }
        // Find if user exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log('hashedPassword: ', hashedPassword);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            name
        });

        newUser.save((err, response) => {
            if (err) {
                console.log('Unable to save user data: ', err);
            }
            // console.log('response: ', response);
            return res.json({
                msg: "user registered successfully"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: 'Server Error' });
    }
}


exports.login = async (req, res) => {

    // console.log('req.body', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill all the fields." });
    }

    UserModel.findOne({ email })
        .exec(async (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    msg: "User with this email does not exists. Please Register.."
                });
            }

            // console.log('user response: ', user);
            const isMatched = await bcrypt.compare(password, user.password);


            if (!isMatched) {
                // console.log('wrong password');
                return res.status(400).json({ msg: "Invalid credentials." });
            }
            // console.log('ismatched: ', ismatched);

            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            // console.log('token: ', token);

            const userRes = {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            }

            return res.json(userRes);

        });
}

exports.deleteUser = async (req, res) => {
    try {
        console.log('req.user: ', req.user);
        const deletedUser = await UserModel.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

exports.isTokenValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        // console.log('token: ', token);

        if (!token) return res.json(false);

        const verified = jwt.verify(token, JWT_SECRET);
        // console.log('verified: ', verified);

        if (!verified) return res.json(false);

        const user = await UserModel.findById(verified.id);
        // console.log('user: ', user);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    const user = await UserModel.findById(req.user);
    // console.log('user: ', user);
    res.json({
        id: user._id,
        email: user.email,
        name: user.name,
    });
}