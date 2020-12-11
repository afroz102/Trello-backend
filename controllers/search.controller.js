const BoardModel = require('../models/board.model');
const ListModel = require('../models/list.model');

exports.searchCard = async (req, res) => {
    try {
        console.log('req.body: ', req.body);

        const boardId = req.body.boardId;
        const searchQuery = req.body.searchQuery;
        await ListModel.find({ boardId }, async function (err, lists) {
            if (err) {
                console.log("can't find list in DB: ", err);
            }
            console.log('lists: ', lists);
            let searchedList = [];

            await lists.forEach(list => {
                // console.log('list.cards.title: ', list.cards);
                list.cards.forEach(card => {
                    if (card.title == searchQuery) {
                        searchedList.push(card);
                    }
                });
                return searchedList;
            });
            console.log('searchedList: ', searchedList);

            return res.json({ searchedList });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
}

exports.getSearchedCard = async (req, res) => {
    try {
        console.log('req.body: ', req.body);

        const boardId = req.body.boardId;
        const searchQuery = req.params.searchQuery;
        await ListModel.find({ boardId }, async function (err, lists) {
            if (err) {
                console.log("can't find list in DB: ", err);
            }
            console.log('lists: ', lists);
            let searchedList = [];

            await lists.forEach(list => {
                // console.log('list.cards.title: ', list.cards);
                list.cards.forEach(card => {
                    if (card.title == searchQuery) {
                        searchedList.push(card);
                    }
                });
                return searchedList;
            });
            console.log('searchedList: ', searchedList);

            return res.json({ searchedList });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
}