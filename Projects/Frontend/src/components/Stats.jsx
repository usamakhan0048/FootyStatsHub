import React, { useEffect, useState } from "react";
import { getAllLeagues, getTopAssistorsForLeagueId, getTopGoalScorersForALeague, getTopRedCardHoldersForLeagueId, getTopYellowCardHoldersForLeagueId } from "../services/Stats";

function Stats() {
  const [leagues, setLeagues] = useState(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [players, setPlayers] = useState(null);
  const [statType, setStatType] = useState("Goals");

  useEffect(() => {
    const fetchLeagues = async () => {
      const response = await getAllLeagues();
      setLeagues(response);
      if (response?.length) {
        setSelectedLeagueId(response[0]._id);
        fetchPlayers(response[0]._id, "Goals");
      }
    };
    fetchLeagues();
  }, []);

  const fetchPlayers = async (leagueId, type) => {
    try {
      let response;
      switch (type) {
        case "Goals": response = await getTopGoalScorersForALeague(leagueId); break;
        case "Assists": response = await getTopAssistorsForLeagueId(leagueId); break;
        case "Yellow Cards": response = await getTopYellowCardHoldersForLeagueId(leagueId); break;
        case "Red Cards": response = await getTopRedCardHoldersForLeagueId(leagueId); break;
        default: response = [];
      }
      setPlayers(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (type) => {
    setStatType(type);
    fetchPlayers(selectedLeagueId, type);
  };

  const handleLeagueChange = (event) => {
    const leagueId = event.target.value;
    setSelectedLeagueId(leagueId);
    fetchPlayers(leagueId, statType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full min-h-screen backdrop-blur-lg bg-gradient-to-b from-purple-900/30 to-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Stats</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
                {leagues && (
                  <select
                    value={selectedLeagueId || ""}
                    onChange={handleLeagueChange}
                    className="w-full lg:w-64 px-4 py-2 bg-white/5 text-white rounded-xl border border-purple-400/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none backdrop-blur-sm transition-all text-sm"
                  >
                    {leagues.map((league) => (
                      <option key={league._id} value={league._id} className="bg-slate-800 text-white">
                        {league.leagueName}
                      </option>
                    ))}
                  </select>
                )}

                <div className="flex flex-wrap justify-center gap-2">
                  {["Goals", "Assists", "Yellow Cards", "Red Cards"].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleButtonClick(type)}
                      className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300
                        ${statType === type
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                          : "bg-white/5 text-purple-100 hover:bg-white/10 border border-purple-400/30"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-purple-500/10">
                {players ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-400/20">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-purple-100">
                          Player
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-purple-100">
                          {statType}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr
                          key={player._id}
                          className="border-b border-purple-400/10 hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-purple-400 w-4">
                                {index + 1}
                              </span>
                              <div className="relative">
                                <img
                                  src={player.picture}
                                  alt=""
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400/30"
                                />
                                <div className="absolute inset-0 rounded-full shadow-inner"></div>
                              </div>
                              <div>
                                <p className="font-medium text-white text-sm">
                                  {player.name}
                                </p>
                                <p className="text-xs text-purple-300">
                                  {player.referenceToTeam.teamName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-lg font-bold text-white">
                              {statType === "Goals" ? player.goals
                                : statType === "Assists" ? player.assists
                                : statType === "Yellow Cards" ? player.yellowCards
                                : player.redCards}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-purple-300 text-sm">
                    Loading players...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;