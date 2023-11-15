const { Author, Game } = require("../../src/model/model");

const gameController = {
    addGame: async (req, res) => {
        try {
            const game = new Game(req.body);
            const savedGame = await game.save();

            if (req.body.publisher) {
                const author = await Author.findById(req.body.publisher);

                if (!author) {
                    return res.status(404).json({ error: "Author not found" });
                }

                await author.updateOne({ $push: { games: savedGame._id } });
            }

            res.status(201).json(savedGame);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getGame: async (req, res) => {
        try {
            const games = await Game.find().populate("publisher");
            res.status(200).json(games);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getAnGame: async (req, res) => {
        try {
            const game = await Game.findById(req.params.id).populate("publisher");

            if (!game) {
                return res.status(404).json({ error: "Game not found" });
            }

            res.status(200).json(game);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateAnGame: async (req, res) => {
        try {
            const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
                new: true, // Return the updated document
                runValidators: true, // Run validators on update
            });

            if (!game) {
                return res.status(404).json({ error: "Game not found" });
            }

            res.status(200).json({ message: "Update successful", updatedGame: game });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    destroyAnGame: async (req, res) => {
        try {
            // Remove the game from authors' books array
            await Author.updateMany(
                { games: req.params.id },
                { $pull: { games: req.params.id } }
            );

            // Delete the game
            const deletedGame = await Game.findByIdAndDelete(req.params.id);

            if (!deletedGame) {
                return res.status(404).json({ error: "Game not found" });
            }

            res.status(200).json({ message: "Delete successful" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = gameController;
