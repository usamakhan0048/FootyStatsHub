import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import footballLogo from '../assets/logo.webp'; // Ensure this logo is of good quality

function Header() {
  return (
    <>
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={footballLogo} alt="Football Logo" className="w-16 h-16 mr-2 object-contain" />
            <h1 className="text-3xl font-bold text-white">FootyStatsHub</h1>
          </div>

          {/* Navigation Section */}
          <nav>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
              <li>
                <Link to="/" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teams" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Teams
                </Link>
              </li>
              <li>
                <Link to="/table" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Standings
                </Link>
              </li>
              <li>
                <Link to="/topScorers" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Top Scorers
                </Link>
              </li>
              <li>
                <Link to="/topAssists" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Top Assists
                </Link>
              </li>
              <li>
                <Link to="/topYellowCards" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Yellow Cards
                </Link>
              </li>
              <li>
                <Link to="/topRedCards" className="block text-center text-white bg-purple-700 p-2 rounded-lg hover:bg-yellow-300 hover:text-black transition duration-300">
                  Red Cards
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Outlet /> {/* Render the child routes here */}
    </>
  );
}

export default Header;
