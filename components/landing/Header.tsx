'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Car, Menu, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#stats', label: 'Stats' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-lg ${
        scrolled
          ? 'bg-white/90 border-purple-200 shadow-xl'
          : 'bg-white/90 border-purple-100'
      }`}
    >
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg"
          >
            <Car className="h-7 w-7 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RentalPro</span>
            <span className="text-xs font-semibold text-gray-500">AI-Powered Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-bold text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login" className="px-4 py-2 font-bold text-base text-gray-700 hover:text-purple-600 transition-colors">
              Sign in
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
            <button className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

              <Link
                href="/register"
                className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg border-2 border-white"
              >
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                <span className="text-white font-extrabold text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Get Started</span>
              </Link>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-7 w-7 text-gray-900" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-gray-300" />
                <div className="pt-4 space-y-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 bg-white border-3 border-gray-300 hover:border-purple-600 rounded-lg shadow-md transition-all"
                  >
                    <span className="text-gray-900 font-bold text-base">Sign in</span>
                  </Link>

                  <button className="w-full group relative" onClick={() => setIsOpen(false)}>
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                    <Link
                      href="/register"
                      className="relative flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl border-2 border-white"
                    >
                      <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                      <span className="text-white font-extrabold text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Get Started</span>
                    </Link>
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
