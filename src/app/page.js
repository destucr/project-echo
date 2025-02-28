'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import HeroButton from '@/app/components/HeroButton';
import GifDisplay from '@/app/components/GifDisplay';
import ContactModal from '@/app/components/ContactModal';
import GithubActivity from '@/app/components/GithubActivity';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] overflow-hidden">
      <nav className="fixed w-full z-50 bg-[var(--background)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <span className="font-black tracking-tighter text-2xl text-[var(--primary)]"></span>
            <div className="hidden sm:flex space-x-12">
              {['About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Contact' ? undefined : `#${item.toLowerCase()}`}
                  onClick={item === 'Contact' ? () => setIsContactModalOpen(true) : undefined}
                  className="text-[var(--foreground)] hover:text-[var(--primary)] tracking-wider text-sm uppercase"
                >
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden">
              {isMenuOpen ? <X className="text-[var(--foreground)]" /> : <Menu className="text-[var(--foreground)]" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="sm:hidden py-6 space-y-6">
              {['About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Contact' ? undefined : `#${item.toLowerCase()}`}
                  onClick={item === 'Contact' ? () => setIsContactModalOpen(true) : undefined}
                  className="block text-[var(--foreground)] hover:text-[var(--primary)] text-2xl font-light"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>


      <main className="relative">
        <section className="h-screen flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8">
              Hi, I'm<br />
              <span className="rainbow-text">Elosalmon</span>
            </h1>
            <p className="text-[var(--foreground)] text-xl sm:text-2xl font-light max-w-2xl mb-12">
              Welcome to my personal website! Feel free to explore and discover more.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://github.com/destucr" target="_blank" rel="noopener noreferrer"
                className="group relative px-8 py-3 bg-transparent border border-[var(--primary)] hover:bg-[var(--primary)] transition-all text-center">
                <span className="relative z-10 text-[var(--primary)] group-hover:text-white">View Projects</span>
              </a>
              <HeroButton className="px-8 py-3 border border-[var(--primary)] text-center" onClick={() => setShowGif(true)} />
            </div>
            {showGif && <GifDisplay onClose={() => setShowGif(false)} />}
          </div>
        </section>

        <section className="px-6 py-24 bg-[var(--neutral)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight mb-8 text-[var(--primary)]">Latest Activity</h2>
            <GithubActivity /> {/* Render the GithubActivity component here */}
          </div>
        </section>
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </main>

      <footer className="py-24 text-center">
        <p className="font-light tracking-wider text-sm">
          Made with <span className="text-[var(--primary)]">Next.js</span> &
          <span className="text-[var(--secondary)]"> Tailwind CSS</span>
        </p>
      </footer>
    </div>
  );
}
