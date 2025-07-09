// 📁 src/App.jsx

import React, { useState } from 'react';
import Sidebar from './component/Sidebar';

function App() {
  const handleAppClick = (app) => {
    console.log("Open app:", app.label);
    // Show window logic goes here
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="img/default-video.mp4" type="video/mp4" />
      </video>

      {/* 📚 Sidebar */}
      <Sidebar onAppClick={handleAppClick} />
    </div>
  );
}

export default App;
