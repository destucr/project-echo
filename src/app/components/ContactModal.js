'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
      <div className="bg-[var(--background)] w-96 rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--foreground)] hover:text-[var(--primary)]">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Get in Touch</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="https://www.linkedin.com/in/destucikal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[var(--foreground)] hover:text-[var(--primary)]"
            >
              <Linkedin />
              <span>destucikal</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/elosalmon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[var(--foreground)] hover:text-[var(--primary)]"
            >
              <Twitter />
              <span>@elosalmon</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:destucr@gmail.com"
              className="flex items-center space-x-2 text-[var(--foreground)] hover:text-[var(--primary)]"
            >
              <Mail />
              <span>Send me Email</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(ContactModal);
