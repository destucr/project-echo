'use client';

import React from 'react';

const TestButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 p-1 px-4 rounded-[8px] bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold backdrop-blur-lg shadow-lg hover:scale-105 transition-all"
    >
      Test Now
    </button>
  );
};

export default React.memo(TestButton);