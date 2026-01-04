'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="relative border-t-2 border-purple-200 bg-gradient-to-b from-white via-purple-50 to-indigo-50 overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl group-hover:shadow-2xl transition-shadow"
              >
                <Car className="h-8 w-8 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RentalPro</span>
                <span className="text-sm font-semibold text-gray-500">AI-Powered Platform</span>
              </div>
            </Link>
            <p className="mt-6 max-w-md text-base text-gray-700 leading-relaxed font-medium">
              Modern car rental management platform powered by AI. Streamline
              your operations with intelligent automation and real-time
              analytics.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">support@rentalpro.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-extrabold text-gray-900 text-xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Product</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="#features"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#stats"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-extrabold text-gray-900 text-xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-bold flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 group-hover:w-3 transition-all"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-gradient-to-r from-transparent via-purple-300 to-transparent h-0.5" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-base text-gray-700 font-semibold">
            © {new Date().getFullYear()} RentalPro. All rights reserved. Built with <span className="text-red-500">❤️</span> & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI</span>
          </p>
          <div className="flex gap-6">
            <Link href="/login" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-bold">
              Privacy
            </Link>
            <Link href="/login" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-bold">
              Terms
            </Link>
            <Link href="/login" className="text-base text-gray-700 hover:text-purple-600 transition-colors font-bold">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
