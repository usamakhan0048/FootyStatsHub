import React from 'react';
import stadiumImage from '../assets/stadium.jpg';
import footballLogo from '../assets/footballpic.jpeg'; 



function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${stadiumImage})` }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        {/* <img src={footballLogo} alt="Football Logo" className="w-24 mb-4" /> */}
        <h1 className="text-5xl font-bold text-white mb-4">FootyStatsHub</h1>
        <p className="text-lg text-white text-center max-w-md">
          Welcome to FootyStatsHub, your ultimate destination for football statistics, standings, and player information.
        </p>
      </div>
    </div>
  );
}

export default Home;