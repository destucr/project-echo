
'use client';

import { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';
import ParticlesBackground from './components/ParticleBackground';
import axios from 'axios';
import TestButton from './api/components/TestButton';
import ApiResponse from './api/components/ApiResponse';
import GifDisplay from './api/components/GifDisplay';

export default function Home() {
  // Group all state declarations at the top
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showGif, setShowGif] = useState(false);

  // Fetch GitHub activity data on component mount
  useEffect(() => {
    const fetchGithubActivity = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/destucr/events');
        setGithubData(response.data);
      } catch (error) {
        console.error('Error fetching GitHub activity:', error);
      }
    };

    fetchGithubActivity();
  }, []);

  // This useEffect ensures isClient is set after first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // In your page.js, update the handleTestButtonClick:
  const handleTestButtonClick = () => {
    setApiResponse('Ome5... 🚀');
    setShowGif(true);
  };

  const handleClose = () => {
    setApiResponse(''); // Clear the API response
    setShowGif(false);  // Hide the GIF
  };

  // Prevent rendering on server-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rest of the component remains the same */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative z-10">
        <nav className="fixed w-full z-50 px-8 py-4 bg-transparent">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-white p-2 hover:bg-white/10 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden sm:flex gap-6 text-white">
              <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
              <a href="#projects" className="hover:text-gray-300 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
            </div>

            {isMenuOpen && (
              <div className="absolute top-16 right-4 sm:hidden bg-black/80 rounded-lg p-4 shadow-lg w-48 text-white">
                <a href="#about" className="block mb-4 hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#projects" className="block mb-4 hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#contact" className="block hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            )}
          </div>
        </nav>

        <div className="grid min-h-screen p-8 pb-20 gap-16 sm:p-20 place-items-center">
          <main className="flex flex-col gap-8 items-center sm:items-start">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl w-full">
              <h1 className="text-4xl font-bold mb-4">
                Hi, My Name is <span className="rainbow-text">Elosalmon</span>
              </h1>
              <p className="text-gray-300 mb-6">
                Welcome to my personal website! Feel free to explore and discover more.
              </p>

              <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 border border-white/10">
                <h2 className="text-xl font-semibold mb-2 text-white">API Test Endpoint</h2>
                <code className="block bg-black/50 text-green-400 p-2 rounded">GET /api/test</code>
                <TestButton onClick={handleTestButtonClick} />
                {apiResponse && <p className="mt-2 text-white">{apiResponse}</p>}
                {showGif && <GifDisplay onClose={handleClose} />}
              </div>
            </div>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
              <a
                className="rounded-full backdrop-blur-md bg-white/10 border border-white/20 transition-all px-6 py-3 text-white hover:bg-white/20"
                href="https://github.com/destucr"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Projects
              </a>
              <a
                className="rounded-full backdrop-blur-md bg-black/30 border border-white/10 transition-all px-6 py-3 text-white hover:bg-black/50"
                href="#contact"
              >
                Contact Me
              </a>
            </div>
          </main>

          {githubData && (
            <div className="backdrop-blur-md bg-gradient-to-br from-green-400 via-green-600 to-green-800 rounded-xl p-6 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Latest GitHub Activity</h2>
              <ul className="list-none space-y-3">
                {githubData.slice(0, 5).map((event, index) => (
                  <li key={index} className="flex items-center gap-2 text-white text-lg font-medium">
                    <div className="flex-shrink-0 bg-black/30 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-git" viewBox="0 0 16 16">
                        <path d="M8 4.5l4 4-1 1L9 7V4h5V2H8v2.5zM5.5 4L9 7V4.5l2 2-4 4-1-1 2-2L5.5 4z" />
                      </svg>
                    </div>
                    <span className="flex-1">{event.type} - <span className="text-green-300">{event.repo.name}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <footer className="flex gap-6 items-center justify-center text-gray-400">
            <div className="backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
              Made with Next.js & Tailwind CSS
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}