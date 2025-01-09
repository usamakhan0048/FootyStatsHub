const { Player, League, Team } = require('../models/models'); // Import Player and League models
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dpvu5sckc',
    api_key: '536943632175232',
    api_secret: '9vMlx2NemZNLowhBdzPFmZaftQg',
});


// Helper function to upload images to Cloudinary
const uploadImageBuffer = async (buffer, playerId) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "movies",
                public_id: `player_${playerId}`,
                overwrite: true,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );

        uploadStream.end(buffer);
    });
};

// Player Controller
const PlayerController = {
    // Add a new player
    addPlayer: async (req, res) => {
        try {
            const { name, age, position, goals, assists, yellowCards, redCards, referenceToTeam ,referenceToLeague} = req.body;

            const team = await Team.findById(referenceToTeam);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }

            const newPlayer = new Player({
                name,
                age,
                position,
                goals,
                assists,
                yellowCards,
                redCards,
                referenceToTeam,
                referenceToLeague,
                picture: '',
            });

            const savedPlayer = await newPlayer.save();
            res.status(201).json({ message: 'Player added successfully', data: savedPlayer });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding player' });
        }
    },

    // Add picture for player
    addPictureForPlayer: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({ message: 'Player picture is required' });
            }

            const { id } = req.params;
            const player = await Player.findById(id);

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            const uploadResult = await uploadImageBuffer(req.file.buffer, id);

            player.picture = uploadResult;
            const updatedPlayer = await player.save();

            res.status(200).json({
                message: 'Player picture uploaded and updated successfully',
                data: updatedPlayer,
            });
        } catch (error) {
            console.error('Error uploading player picture:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get player by ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const player = await Player.findById(id).populate('referenceToTeam');

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(200).json({ data: player });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching player' });
        }
    },

    // Get all players
    getAllPlayers: async (req, res) => {
        try {
            const players = await Player.find().populate('referenceToTeam');
            res.status(200).json({ data: players });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching players' });
        }
    },

    // Delete player by ID
    deletePlayer: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedPlayer = await Player.findByIdAndDelete(id);

            if (!deletedPlayer) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(200).json({ message: 'Player deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting player' });
        }
    },

    // Update player
    updatePlayer: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, age, position, goals, assists, yellowCards, redCards } = req.body;

            const updatedPlayer = await Player.findByIdAndUpdate(
                id,
                { name, age, position, goals, assists, yellowCards, redCards },
                { new: true }
            );

            if (!updatedPlayer) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(200).json({ message: 'Player updated successfully', data: updatedPlayer });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating player' });
        }
    },

    // Get top 5 goal scorers for a league
    top5GoalScorers: async (req, res) => {
        try {
            const { leagueId } = req.params;
            const players = await Player.find({ referenceToLeague: leagueId })
                .populate('referenceToTeam')
                .sort({ goals: -1 })
                .limit(5);

            res.status(200).json( players );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching top goal scorers' });
        }
    },

    // Get top 5 assist providers for a league
    top5GoalAssistors: async (req, res) => {
        try {
            const { leagueId } = req.params;
            const players = await Player.find({ referenceToLeague: leagueId })
            .populate('referenceToTeam')
                .sort({ assists: -1 })
                .limit(5);

            res.status(200).json( players );
        } catch (error) {
            console.error(error);
            res.status(500).json( 'Error fetching top assist providers');
        }
    },

    // Get top 5 yellow card holders for a league
    top5YellowCardHolders: async (req, res) => {
        try {
            const { leagueId } = req.params;
            const players = await Player.find({ referenceToLeague: leagueId })
            .populate('referenceToTeam')
                .sort({ yellowCards: -1 })
                .limit(5);

            res.status(200).json( players );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching top yellow card holders' });
        }
    },

    // Get top 5 red card holders for a league
    top5RedCardHolders: async (req, res) => {
        try {
            const { leagueId } = req.params;
            const players = await Player.find({ referenceToLeague: leagueId })
            .populate('referenceToTeam')    
            .sort({ redCards: -1 })
                .limit(5);

            res.status(200).json( players );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching top red card holders' });
        }
    },
};

module.exports = PlayerController;
