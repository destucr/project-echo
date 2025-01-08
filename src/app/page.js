import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-4">
        <div className="flex justify-end items-center">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-white p-2 hover:bg-white/10 rounded-lg backdrop-blur-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-6 backdrop-blur-md bg-white/10 px-6 py-3 rounded-full border border-white/20">
            <a href="#home" className="text-white hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#about" className="text-white hover:text-gray-300 transition-colors">
              About
            </a>
            <a href="#projects" className="text-white hover:text-gray-300 transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 right-4 sm:hidden backdrop-blur-lg bg-black/80 rounded-lg border border-white/20 p-4 w-48">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-white hover:text-gray-300 transition-colors">
                  Home
                </a>
                <a href="#about" className="text-white hover:text-gray-300 transition-colors">
                  About
                </a>
                <a href="#projects" className="text-white hover:text-gray-300 transition-colors">
                  Projects
                </a>
                <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {/* Glass Card - Main Content */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 max-w-2xl w-full">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Hi, My Name is Destu Cikal
            </h1>
            <p className="text-gray-300 mb-6">
              Welcome to my personal website! Feel free to explore and discover more.
            </p>
            
            {/* API Test Section */}
            <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 border border-white/10">
              <h2 className="text-xl font-semibold mb-2 text-white">API Test Endpoint</h2>
              <code className="block bg-black/50 text-green-400 p-2 rounded">
                GET /api/test
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
            <a
              className="rounded-full backdrop-blur-md bg-white/10 border border-white/20 transition-all px-6 py-3 text-white hover:bg-white/20 flex items-center gap-2"
              href="https://github.com/destucr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/vercel.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="invert"
              />
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

        {/* Footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-400">
          <div className="backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            Made with Next.js & Tailwind CSS
          </div>
        </footer>
      </div>
    </div>
  );
}