import React, { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');

    // TODO: Call OpenRouter API and append response
    const reply = { role: 'bot', content: "[AI response here]" };
    setMessages([...updated, reply]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Ask a question..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}

