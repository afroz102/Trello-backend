const ListModel = require('../models/list.model');
const BoardModel = require('../models/board.model');
const CardModel = require('../models/card.model');


exports.createList = async (req, res) => {
    try {
        // console.log('req.body: ', req.body);
        const boardId = req.body.boardId;
        const listTitle = req.body.title;

        // const board = await BoardModel.findById(boardId);
        // console.log('Action in board: ', board);

        const newList = new ListModel({
            boardId: boardId,
            title: listTitle
        });

        newList.save((err, list) => {
            if (err) {
                console.log("Can not Create List. Error: ", err);
                return res.status(401).json({
                    // error: errorHandler(err)
                    error: err
                });
            }
            console.log('list created: ', list);

            return res.json({ msg: "List created" });
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}



exports.editListTitle = async (req, res) => {
    try {
        // console.log('req.body: ', req.body);
        const listId = req.body.listId;
        const newTitle = req.body.newTitle;

        await ListModel.findById(listId, async function (err, list) {
            if (err) {
                console.log("Error in finding list while updating list: ", err);
            }
            // console.log('list found:', list);
            list.title = newTitle;

            list.save((err, updatedList) => {
                if (err) {
                    console.log("error while updating list title: ", err);
                }
                // console.log("updated doc: ", updatedList);
                return res.json({ msg: "List title updated." });
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteList = async (req, res) => {
    try {
        const listId = req.body.listId;
        const deleted = await ListModel.findByIdAndRemove(listId);
        const cardDeleted = await CardModel.findOneAndRemove({ listId }, function (err, response) {
            if (err) {
                console.log("can't delete from card: ", err);
            }
            // console.log('response: ', response);
        })
        return res.json({ msg: "List Deleted." });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}