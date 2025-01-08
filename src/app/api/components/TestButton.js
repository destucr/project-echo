
// src/app/components/TestButton.js
'use client';

export default function TestButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 p-1 px-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold backdrop-blur-lg shadow-lg hover:scale-105 transition-all"
    >
      Test Now
    </button>
  );
}