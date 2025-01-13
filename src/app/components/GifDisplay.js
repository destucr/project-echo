// src/app/components/GifDisplay.js
import { useState } from 'react';

export default function GifDisplay({ onClose }) {
  return (
    <div
      className="mt-4 relative group cursor-pointer"
      onClick={onClose} // Handle click on container
    >
      {/* Close button */}
      <button
        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hidden group-hover:block"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the container click from firing
          onClose();
        }}
      >
        ✖
      </button>
      <img
        src="https://media1.tenor.com/m/GSxYNJxHTEMAAAAd/ome5-fat5.gif"
        alt="Ome5 Flight GIF"
        className="w-full rounded-lg"
      />
    </div>
  );
}
