// 1. League Model
const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  leagueName: { type: String, required: true },
  totalTeams: { type: Number, required: true },
  nationality: { type: String, required: true },
  leagueLogo :{ type: String }
});

const League = mongoose.model('League', leagueSchema);

// 2. Team Model
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  referenceToLeague: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
  totalPlayers: { type: Number, required: true },
  teamLogo: { type: String },
});

const Team = mongoose.model('Team', teamSchema);

// 3. Player Model
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  position: { type: String, required: true },
  referenceToTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  referenceToLeague: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
  picture: { type: String },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  yellowCards: { type: Number, default: 0 },
  redCards: { type: Number, default: 0 },
});

const Player = mongoose.model('Player', playerSchema);

// 4. Admin (Employee) Model
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { League, Team, Player, Admin };
