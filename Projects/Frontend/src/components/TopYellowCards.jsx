import React, { useState, useEffect } from 'react';
import { APIKEY } from '../services/APIkey';

const leagues = [
  { id: '61', name: 'Ligue 1' },
  { id: '21', name: 'Euro Championship' },
  { id: '4', name: 'Confederations Cup' }
];

const seasons = ['2021', '2022', '2023'];

function TopYellowCards() {
  const [selectedLeague, setSelectedLeague] = useState('61');
  const [selectedSeason, setSelectedSeason] = useState('2023');
  const [topYellowCards, setTopYellowCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statType, setStatType] = useState("Yellow Cards");

  const fetchTopYellowCards = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", APIKEY);
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

      const response = await fetch(
        `https://v3.football.api-sports.io/players/topyellowcards?league=${selectedLeague}&season=${selectedSeason}`,
        {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }
      );
      const data = await response.json();
      setTopYellowCards(data.response || []);
    } catch (error) {
      console.error('Error fetching top yellow cards:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTopYellowCards();
  }, [selectedLeague, selectedSeason]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full min-h-screen backdrop-blur-lg bg-gradient-to-b from-purple-900/30 to-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Top Yellow Cards</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="w-full lg:w-64 px-4 py-2 bg-white/5 text-white rounded-xl border border-purple-400/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none backdrop-blur-sm transition-all text-sm"
                >
                  {leagues.map(league => (
                    <option key={league.id} value={league.id} className="bg-slate-800 text-white">
                      {league.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full lg:w-64 px-4 py-2 bg-white/5 text-white rounded-xl border border-purple-400/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none backdrop-blur-sm transition-all text-sm"
                >
                  {seasons.map(season => (
                    <option key={season} value={season} className="bg-slate-800 text-white">
                      {season}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-purple-500/10">
                {loading ? (
                  <div className="p-6 text-center text-purple-300 text-sm">Loading players...</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-400/20">
                        <th className="px-6 py-4 text-left text-md font-semibold text-purple-100">Player</th>
                        <th className="px-6 py-4 text-right text-md font-semibold text-purple-100">Yellow Cards</th>
                        <th className="px-6 py-4 text-right text-md font-semibold text-purple-100">Appearances</th>
                        <th className="px-6 py-4 text-right text-md font-semibold text-purple-100">Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topYellowCards.map(({ player, statistics }, index) => (
                        <tr key={player.id} className="border-b border-purple-400/10 hover:bg-white/5 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-purple-400 w-4">{index + 1}</span>
                              <div className="relative">
                                <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400/30" />
                                <div className="absolute inset-0 rounded-full shadow-inner"></div>
                              </div>
                              <div>
                                <p className="font-medium text-white text-sm">{player.name}</p>
                                <p className="text-xs text-purple-300">{statistics[0].team.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-md text-white">{statistics[0].cards.yellow}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-md text-white">{statistics[0].games.appearences}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-md text-white">{statistics[0].team.name}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopYellowCards;