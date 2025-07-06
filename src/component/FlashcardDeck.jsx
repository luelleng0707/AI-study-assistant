import React, { useState } from 'react';

export default function FlashcardDeck() {
  const dummyCards = [
    { q: "What is passé composé?", a: "A past tense used for completed actions." },
    { q: "How to form passé composé?", a: "Auxiliary verb + past participle." },
  ];

  const [flipped, setFlipped] = useState(Array(dummyCards.length).fill(false));

  const toggleFlip = (i) => {
    const updated = [...flipped];
    updated[i] = !updated[i];
    setFlipped(updated);
  };

  return (
    <div className="space-y-4">
      {dummyCards.map((card, i) => (
        <div
          key={i}
          onClick={() => toggleFlip(i)}
          className="cursor-pointer bg-yellow-100 rounded p-4 shadow hover:shadow-lg"
        >
          <strong>{flipped[i] ? 'A:' : 'Q:'}</strong> {flipped[i] ? card.a : card.q}
        </div>
      ))}
    </div>
  );
}