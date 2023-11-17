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
        console.log(req);
        try {
            let { page = 1, limit = 10, sortBy, sortOrder, name } = req.query;

            // Convert query parameters to integers
            page = parseInt(page);
            limit = parseInt(limit);

            // Define options for pagination and sorting
            const options = {
                page,
                limit,
                populate: "publisher", // Assuming you have a reference to the 'publisher' field
                sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
            };

            // Define a query for filtering
            const query = name ? { name: new RegExp(name, 'i') } : {};

            // Perform pagination, sorting, and filtering with Mongoose paginate
            const result = await Game.paginate(query, options);

            res.status(200).json({
                totalItems: result.totalDocs,
                currentPage: result.page,
                totalPages: result.totalPages,
                data: result.docs,
            });
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
