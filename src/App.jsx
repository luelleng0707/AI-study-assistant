import React, { useState } from 'react';
import UploadBox from './components/UploadBox';
import FlashcardDeck from './components/FlashcardDeck';
import ChatBox from './components/ChatBox';

export default function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">📄 Upload & Generate</h1>
        <UploadBox />
        <FlashcardDeck />
      </div>
      <div className="w-full md:w-1/2 bg-white p-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">💬 Chat with Document</h1>
        <ChatBox />
      </div>
    </div>
  );
}
