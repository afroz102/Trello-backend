const BoardModel = require('../models/board.model');
const ListModel = require('../models/list.model');
const CardModel = require('../models/card.model');

exports.createBoard = async (req, res) => {
    try {
        console.log('req.user: ', req.user);
        console.log('req.body: ', req.body);
        const userId = req.user;
        const newBoard = new BoardModel({
            user: userId,
            title: req.body.title
        });

        newBoard.save((err, board) => {
            if (err) {
                console.log("Can not Create Board. Error: ", err);
                return res.status(401).json({
                    // error: errorHandler(err)
                    error: err
                });
            }
            // console.log('board', board);

            return res.json({ board });
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.getBoard = async (req, res) => {
    const userId = req.user;
    try {
        await BoardModel.find({ user: userId }, function (err, docs) {
            if (err) {
                console.log("can't find board in DB: ", err);
            }

            // console.log('docs: ', docs);
            res.json(docs);
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
}

exports.getBoardById = async (req, res) => {
    // console.log("req: ", req.params);
    const boardId = req.params.boardId;
    try {
        await BoardModel.findById(boardId, async function (err, board) {
            if (err) {
                console.log("can't find board in DB: ", err);
            }
            // console.log('board with id: ', board);

            const listData = await ListModel.find({ boardId });
            // console.log('listData in getBoardById: ', listData );

            res.json({
                board: board,
                lists: listData
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
}