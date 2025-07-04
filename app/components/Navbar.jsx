"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">Kunal</h1>

        {/* Desktop Menu */}
        <div className="space-x-6 hidden sm:flex">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="relative text-white hover:text-blue-400 transition"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="sm:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-black/80 px-6 pb-4"
          >
            <div className="flex flex-col space-y-4 text-white text-lg">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-400 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
