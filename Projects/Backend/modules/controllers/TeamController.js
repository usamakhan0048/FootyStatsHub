const { Team } = require('../models/models'); // Import Team model
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Helper function to upload images to Cloudinary
const uploadImageBuffer = async (buffer, teamId) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "movies",
                public_id: `team_${teamId}`,
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

// Team Controller
const TeamController = {
    addTeam: async (req, res) => {
        try {
            const { teamName, referenceToLeague, totalPlayers, nationality } = req.body;

            const newTeam = new Team({
                teamName,
                referenceToLeague, // Updated to match the schema
                totalPlayers,      // Updated to match the schema
                nationality,
                teamLogo: '', 
            });

            const savedTeam = await newTeam.save();
            res.status(201).json({ message: 'Team added successfully', data: savedTeam });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding team' });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const team = await Team.findById(id).populate('referenceToLeague');

            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }

            res.status(200).json({ data: team });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching team' });
        }
    },

    getAllTeams: async (req, res) => {
        try {
            const teams = await Team.find().populate('referenceToLeague')
            res.status(200).json({ data: teams });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching teams' });
        }
    },

    deleteTeam: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTeam = await Team.findByIdAndDelete(id);

            if (!deletedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }

            res.status(200).json({ message: 'Team deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting team' });
        }
    },

    updateTeam: async (req, res) => {
        try {
            const { id } = req.params;
            const { teamName, referenceToLeague, totalPlayers, nationality } = req.body;

            const updatedTeam = await Team.findByIdAndUpdate(
                id,
                { teamName, referenceToLeague, totalPlayers, nationality }, // Updated to match the schema
                { new: true }
            );

            if (!updatedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }

            res.status(200).json({ message: 'Team updated successfully', data: updatedTeam });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating team' });
        }
    },

    addLogoForTeam: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Team logo is required' });
            }

            const { id } = req.params;
            const team = await Team.findById(id);

            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }

            const uploadResult = await uploadImageBuffer(req.file.buffer, id);

            team.teamLogo = uploadResult;
            const updatedTeam = await team.save();

            res.status(200).json({
                message: 'Team logo uploaded and updated successfully',
                data: updatedTeam,
            });
        } catch (error) {
            console.error('Error uploading team logo:', error.message);
            res.status(500).json({ message: 'Internal server error' });
 }
    },
};

module.exports = TeamController;