import React, { useState, useEffect } from 'react';
import { APIKEY } from '../services/APIkey';

const countries = [
  'England',
  'France',
  'Spain',
  'Italy'
];

const Teams = () => {
  const [selectedCountry, setSelectedCountry] = useState('England');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", APIKEY);
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

      const response = await fetch(
        `https://v3.football.api-sports.io/teams?country=${selectedCountry}`, 
        {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }
      );
      const data = await response.json();
      // Limit to top 20 teams
      setTeams(data.response ? data.response.slice(0, 20) : []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full min-h-screen backdrop-blur-lg bg-gradient-to-b from-purple-900/30 to-slate-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Football Teams</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-purple-500/20">
              <div className="mb-6">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full lg:w-64 px-4 py-2 bg-white/5 text-white rounded-xl border border-purple-400/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none backdrop-blur-sm transition-all text-sm"
                >
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-slate-800 text-white">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="text-center py-8 text-purple-300">Loading teams...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map(({ team, venue }) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <img
                            src={team.logo}
                            alt={team.name}
                            className="w-16 h-16 object-contain"
                          />
                          <div>
                            <h3 className="text-xl font-bold">{team.name}</h3>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">Team Info</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Founded:</span> {team.founded || 'N/A'}</p>
                          <p><span className="font-medium">Type:</span> {team.national ? 'National' : 'Club'}</p>
                        </div>

                        {venue && (
                          <>
                            <h4 className="font-semibold mt-4 mb-2">Stadium</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Name:</span> {venue.name || 'N/A'}</p>
                              <p><span className="font-medium">City :</span> {venue.city || 'N/A'}</p>
                              <p><span className="font-medium">Capacity:</span> {venue.capacity ? venue.capacity.toLocaleString() : 'N/A'}</p>
                            </div>
                            {venue.image && (
                              <img
                                src={venue.image}
                                alt={venue.name}
                                className="w-full h-40 object-cover mt-4 rounded"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;