import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
   <footer className="bg-gray-100/50 py-12 px-4 border-t mt-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-base text-gray-600">© {new Date().getFullYear()} All rights reserved.</p>
        <p className="text-base text-gray-600">Developed by <span className="font-semibold text-3xl text-blue-600">Yash Gupta</span></p>
      </div>
    </footer>
  );
}