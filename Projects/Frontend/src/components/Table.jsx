import React, { useState, useEffect } from 'react';
import { APIKEY } from '../services/APIkey';

const StandingsTable = () => {
  const [selectedLeague, setSelectedLeague] = useState('61');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(false);

  const leagues = [
    { id: '4', name: 'Euro Championship' },
    { id: '21', name: 'Confederations Cup' },
    { id: '61', name: 'Ligue 1' }
  ];

  const years = ['2021', '2022', '2023'];

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", APIKEY);
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

      const response = await fetch(
        `https://v3.football.api-sports.io/standings?league=${selectedLeague}&season=${selectedYear}`,
        {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }
      );
      const data = await response.json();
      setStandings(data.response[0]?.league?.standings[0] || []);
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague, selectedYear]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full min-h-screen backdrop-blur-lg bg-gradient-to-b from-purple-900/30 to-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Football League Standings</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20">
              <div className="flex gap-4 mb-6">
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full lg:w-64 px-4 py-2 bg-white/5 text-white rounded-xl border border-purple-400/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none backdrop-blur-sm transition-all text-sm"
                >
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="text-center py-8 text-purple-300">Loading standings...</div>
              ) : standings && standings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="">
                        <th className="px-4 py-2 text-left font-semibold text-white w-[80px]">Rank</th>
                        <th className="px-4 py-2 text-left font-semibold text-white">Team</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">MP</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">W</th> 
                        <th className="px-4 py-2 text-right font-semibold text-white">D</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">L</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">GF</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">GA</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">GD</th>
                        <th className="px-4 py-2 text-right font-semibold text-white">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team) => (
                        <tr key={team.rank} className="border-t border-gray-200 hover:bg-purple-500">
                          <td className="px-4 py-2 font-medium text-white">{team.rank}</td>
                          <td className="px-4 py-2 text-white">
                            <div className="flex items-center gap-2">
                              <img
                                src={team.team.logo}
                                alt={team.team.name}
                                className="w-6 h-6"
                              />
                              {team.team.name}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right text-white">{team.all.played}</td>
                          <td className="px-4 py-2 text-right text-white">{team.all.win}</td>
                          <td className="px-4 py-2 text-right text-white">{team.all.draw}</td>
                          <td className="px-4 py-2 text-right text-white">{team.all.lose}</td>
                          <td className="px-4 py-2 text-right text-white">{team.all.goals.for}</td>
                          <td className="px-4 py-2 text-right text-white">{team.all.goals.against}</td>
                          <td className="px-4 py-2 text-right text-white">{team.goalsDiff}</td>
                          <td className="px-4 py-2 text-right font-bold text-white">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-white">No standings data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;