const { League } = require('../models/models'); // Import League model
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dpvu5sckc',
    api_key: '536943632175232',
    api_secret: '9vMlx2NemZNLowhBdzPFmZaftQg',
});

// Helper function to upload images to Cloudinary
const uploadImageBuffer = async (buffer, leagueId) => {
    return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "movies",
                public_id: `league_${leagueId}`,
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

// League Controller
const LeagueController = {
    addLeague: async (req, res) => {
        try {
            const { leagueName, totalTeams, nationality } = req.body;

            const newLeague = new League({
                leagueName,
                totalTeams,
                nationality,
                leagueLogo: '', 
            });

            const savedLeague = await newLeague.save();
            res.status(201).json({ message: 'League added successfully', data: savedLeague });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding league' });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const league = await League.findById(id);

            if (!league) {
                return res.status(404).json({ message: 'League not found' });
            }

            res.status(200).json({ data: league });
        } catch (error) {addEventListener
            console.error(error);
            res.status(500).json({ message: 'Error fetching league' });
        }
    },

    getAllLeagues: async (req, res) => {
        try {
            const leagues = await League.find();
            res.status(200).json(leagues);
        } catch (error) {
            console.error(error);
            res.status(500).json('Error fetching leagues');
        }
    },

    deleteLeague: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedLeague = await League.findByIdAndDelete(id);

            if (!deletedLeague) {
                return res.status(404).json({ message: 'League not found' });
            }

            res.status(200).json({ message: 'League deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting league' });
        }
    },

    updateLeague: async (req, res) => {
        try {
            const { id } = req.params;
            const { leagueName, totalTeams, nationality } = req.body;

            const updatedLeague = await League.findByIdAndUpdate(
                id,
                { leagueName, totalTeams, nationality },
                { new: true }
            );

            if (!updatedLeague) {
                return res.status(404).json({ message: 'League not found' });
            }

            res.status(200).json({ message: 'League updated successfully', data: updatedLeague });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating league' });
        }
    },

    addLogoForLeague: async (req, res) => {
        try {
            

            console.log(req.file.buffer);

            if (!req.file) {
                return res.status(400).json({ message: 'League logo is required' });
            }

            const { id } = req.params;
            const league = await League.findById(id);

            if (!league) {
                return res.status(404).json({ message: 'League not found' });
            }

            const uploadResult = await uploadImageBuffer(req.file.buffer, id);

            league.leagueLogo = uploadResult;
            const updatedLeague = await league.save();

            res.status(200).json({
                message: 'League logo uploaded and updated successfully',
                data: updatedLeague,
            });
        } catch (error) {
            console.error('Error uploading league logo:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = LeagueController;
