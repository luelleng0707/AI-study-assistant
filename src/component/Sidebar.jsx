// 📁 src/component/Sidebar.jsx

import React from 'react';

const apps = [
  { id: "upload", label: "Upload", icon: "https://img.icons8.com/ios-filled/50/upload.png" },
  { id: "flashcards", label: "Cards", icon: "https://img.icons8.com/ios-filled/50/brain.png" },
  { id: "calendar", label: "Cal", icon: "https://img.icons8.com/ios-filled/50/calendar.png" },
  { id: "todo", label: "ToDo", icon: "https://img.icons8.com/ios-filled/50/checklist.png" },
  { id: "timer", label: "Timer", icon: "https://img.icons8.com/ios-filled/50/timer.png" },
  { id: "quotes", label: "Quotes", icon: "https://img.icons8.com/ios-filled/50/quote.png" },
  { id: "chat-doc", label: "ChatDoc", icon: "https://img.icons8.com/ios-filled/50/chat.png" }
];

const Sidebar = ({ onAppClick }) => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 h-[85vh] w-20 bg-white/30 backdrop-blur-md rounded-2xl flex flex-col items-center py-4 space-y-4 shadow-lg z-10 overflow-y-auto">
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => onAppClick(app)}
          className="flex flex-col items-center cursor-pointer hover:bg-white/20 p-2 rounded-lg transition text-black text-xs"
        >
          <img src={app.icon} alt={app.label} className="w-6 h-6" />
          <span className="mt-1">{app.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
