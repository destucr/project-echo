'use client';

import React from 'react';

const HeroButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative px-8 py-3 bg-transparent border border-[var(--primary)] hover:bg-[var(--primary)] transition-all text-center"
    >
      <span className="relative z-10 text-[var(--primary)] group-hover:text-white">For Surprise</span>
    </button>
  );
};

export default React.memo(HeroButton);
