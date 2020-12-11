const CardModel = require('../models/card.model');
const ListModel = require('../models/list.model')

exports.createCard = async (req, res) => {
    try {
        // console.log('req.body: ', req.body);

        const listId = req.body.listId;
        const cardTitle = req.body.title;

        const newCardObject = {
            listId: listId,
            title: cardTitle
        }

        const newCard = new CardModel(newCardObject);

        newCard.save(async (err, card) => {
            if (err) {
                console.log("Can not Create Card. Error: ", err);
                return res.status(401).json({
                    error: err
                });
            }
            // console.log('card created: ', card);

            await ListModel.findById(listId, function (err, list) {
                if (err) {
                    console.log(err);
                }
                list.cards.push(card);
                list.save((err, doc) => {
                    if (err) {
                        console.log("error while updating list: ", err);
                    }
                    // console.log("updated doc: ", doc);
                    return res.json({ msg: "Card created" });
                });
            });

        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.updateCardText = async (req, res) => {
    try {
        // console.log('req.body: ', req.body);
        const cardId = req.body.cardId;
        const listId = req.body.listId;
        const newTitle = req.body.newTitle;

        await CardModel.findById(cardId, async function (err, card) {
            if (err) {
                console.log("Error in finding card while updating card: ", err);
            }
            // console.log('card to be updated found: ', card)

            card.title = newTitle;

            card.save((err, updatedCard) => {
                if (err) {
                    console.log("error while updating Card title: ", err);
                }
                // console.log("updated doc in card model: ", updatedCard);

                ListModel.findById(listId, function (err, list) {
                    if (err) {
                        console.log(err);
                    }

                    const indexToUpdate = list.cards.findIndex(card => card._id == cardId);

                    list.cards[indexToUpdate] = updatedCard;

                    list.markModified('cards');

                    // console.log('list: ', list);

                    list.save((err, updatedCardInList) => {
                        if (err) {
                            console.log("error while updating card in list model: ", err);
                        }
                        // console.log("updated doc in list model: ", updatedCardInList);

                        return res.json({ msg: "Card text updated." });
                    });
                });
                // return res.json({ updatedCard });
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteCard = async (req, res) => {
    try {
        // console.log('req.body in delete card: ', req.body);
        const cardId = req.body.cardId;
        const listId = req.body.listId;
        const cardDeleted = await CardModel.findByIdAndRemove(cardId);
        const cardDeletedInList = await ListModel.findById(listId, function (err, list) {
            if (err) {
                console.log("can't find list: ", err);
            }
            // console.log('response: ', list);

            const filteredCard = list.cards.filter(card => JSON.stringify(card._id) !== JSON.stringify(cardId));
            // console.log('filteredCard: ', filteredCard);
            list.cards = filteredCard;
            list.save((err, response) => {
                if (err) {
                    console.log("can't delete card from list: ", err);
                }
                // console.log('Card deleted from list model: ', response);
            })

            return res.json({ msg: "Card deleted" });
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}