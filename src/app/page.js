'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Github, Mail, Activity, Code, Terminal } from 'lucide-react';
import axios from 'axios';
import TestButton from './api/components/TestButton';
import ApiResponse from './api/components/ApiResponse';
import GifDisplay from './api/components/GifDisplay';
import TriangleShader from './components/TriangleShader';

// Memoize components that don't need to re-render
const MemoizedTestButton = React.memo(TestButton);
const MemoizedGifDisplay = React.memo(GifDisplay);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showGif, setShowGif] = useState(false);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTestButtonClick = () => {
    setApiResponse('Ome5... 😝');
    setShowGif(true);
  };

  const handleClose = () => {
    setApiResponse('');
    setShowGif(false);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-white font-bold text-xl"></span>
          <div className="flex items-center gap-6">
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
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 right-0 left-0 z-40 sm:hidden bg-black/95 backdrop-blur-lg border-b border-white/10">
          <div className="p-4 flex flex-col items-center gap-4">
            <a href="#about" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20">
              <h1 className="text-5xl font-bold mb-4">
                Hi, I'm <span className="rainbow-text">Elosalmon</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Welcome to my personal website! Feel free to explore and discover more.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  className="rounded-full backdrop-blur-md bg-white/10 border border-white/20 transition-all px-6 py-3 text-white hover:bg-white/20 flex items-center gap-2"
                  href="https://github.com/destucr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                  View Projects
                </a>
                <a
                  className="rounded-full backdrop-blur-md bg-black/30 border border-white/10 transition-all px-6 py-3 text-white hover:bg-black/50 flex items-center gap-2"
                  href="#contact"
                >
                  <Mail size={20} />
                  Contact Me
                </a>
              </div>
            </div>

            {/* API Test Section */}
            <div className="backdrop-blur-lg bg-black/40 rounded-2xl p-8 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={24} className="text-green-400" />
                <h2 className="text-xl font-semibold text-white">API Test Endpoint</h2>
              </div>
              <code className="block bg-black/50 text-green-400 p-4 rounded-lg mb-4">GET /api/test</code>
              <TestButton onClick={handleTestButtonClick} />
              {apiResponse && <p className="mt-4 text-white">{apiResponse}</p>}
              {showGif && <GifDisplay onClose={handleClose} />}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Triangle Shader */}
            <div className="backdrop-blur-lg bg-black/40 rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Code size={24} className="text-blue-400" />
                <h2 className="text-xl font-semibold text-white">WebGL Shader</h2>
              </div>
              <TriangleShader />
            </div>

            {/* GitHub Activity */}
            {githubData && (
              <div className="backdrop-blur-lg bg-black/40 rounded-2xl p-8 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <Activity size={24} className="text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Latest GitHub Activity</h2>
                </div>
                <ul className="space-y-4">
                  {githubData.slice(0, 5).map((event, index) => (
                    <li key={index} className="bg-black/30 rounded-lg p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Github size={16} />
                        <span className="text-green-400">{event.type}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{event.repo.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 mb-8 text-center">
          <div className="inline-block backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full text-gray-400">
            Made with Next.js & Tailwind CSS
          </div>
        </footer>
      </div>
    </div>
  );
}