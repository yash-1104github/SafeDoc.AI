import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-600">SafeDoc AI</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6 text-gray-600">
              <li>
                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
