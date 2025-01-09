const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const logoStorage = multer.memoryStorage();
const uploadLogoMiddleware = multer({ storage: logoStorage }).single('file');

const app = express();

const LeagueController = require('./modules/controllers/LeagueController');
const TeamController = require('./modules/controllers/TeamController');
const PlayerController = require('./modules/controllers/PlayerController');
const AdminController = require('./modules/controllers/AdminController');
const authenticateAdmin = require('./middleware/AuthenticateAdmin'); // JWT Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// League Routes
app.post('/leagues', LeagueController.addLeague);
app.get('/leagues', LeagueController.getAllLeagues);
app.get('/leagues/:id', LeagueController.getById);
app.put('/leagues/:id', LeagueController.updateLeague);
app.delete('/leagues/:id', LeagueController.deleteLeague);
app.post('/leagues/:id/logo',uploadLogoMiddleware ,LeagueController.addLogoForLeague);

// Team Routes
app.post('/teams', TeamController.addTeam);
app.get('/teams', TeamController.getAllTeams);
app.get('/teams/:id', TeamController.getById);
app.put('/teams/:id', TeamController.updateTeam);
app.delete('/teams/:id', TeamController.deleteTeam);
app.post('/teams/:id/logo',uploadLogoMiddleware ,TeamController.addLogoForTeam);

// Player Routes
app.post('/players', PlayerController.addPlayer);
app.get('/players', PlayerController.getAllPlayers);
app.get('/players/:id', PlayerController.getById);
app.put('/players/:id', PlayerController.updatePlayer);
app.delete('/players/:id', PlayerController.deletePlayer);
app.post('/players/:id/photo',uploadLogoMiddleware ,PlayerController.addPictureForPlayer);
app.get('/players/top-scorers/:leagueId', PlayerController.top5GoalScorers);
app.get('/players/top-assistors/:leagueId', PlayerController.top5GoalAssistors);
app.get('/players/top-yellow-cards/:leagueId', PlayerController.top5YellowCardHolders);
app.get('/players/top-red-cards/:leagueId', PlayerController.top5RedCardHolders);

// Admin Routes
app.post('/admin/signup', AdminController.signup);
app.post('/admin/login', AdminController.login);
app.get('/admin/profile', authenticateAdmin, AdminController.getProfile);
// app.get('/admin/dashboard-stats', authenticateAdmin, AdminController.);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect("mongodb+srv://i222524:ahsan1011@weblab11.x7sop.mongodb.net/webProject", {})
    .then(() => console.log("Connection built"))
    .catch((e) => console.log("Connection failed"));
