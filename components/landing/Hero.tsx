'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, TrendingUp, Car, Users, BarChart } from 'lucide-react';

export function Hero() {
  const floatingIcons = [
    { Icon: Car, color: 'text-blue-500', delay: 0, x: '10%', y: '20%' },
    { Icon: Users, color: 'text-purple-500', delay: 0.2, x: '80%', y: '30%' },
    { Icon: BarChart, color: 'text-green-500', delay: 0.4, x: '15%', y: '70%' },
    { Icon: Zap, color: 'text-yellow-500', delay: 0.6, x: '85%', y: '60%' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [-20, 20, -20]
          }}
          transition={{
            delay: item.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute hidden lg:block"
          style={{ left: item.x, top: item.y }}
        >
          <item.Icon className={`w-12 h-12 ${item.color}`} />
        </motion.div>
      ))}

      <div className="container relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mb-6"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-semibold">AI-Powered Platform</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="text-gray-900">
                  Your Rental Business
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Experience the future of car rental management with AI-powered automation, real-time analytics, and intelligent insights.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <button className="group relative overflow-hidden w-full sm:w-auto">
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                    <Link
                      href="/register"
                      className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-xl transition-all duration-300 border-2 border-white"
                    >
                      <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                      <span className="text-white font-extrabold text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                        Start Free Trial
                      </span>
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </Link>
                  </button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-3 border-purple-600 hover:border-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-purple-600 font-extrabold text-base">View Live Demo</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex gap-8 justify-center lg:justify-start"
              >
                {[
                  { value: '500+', label: 'Companies' },
                  { value: '50K+', label: 'Vehicles' },
                  { value: '99.9%', label: 'Uptime' }
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Main Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-3xl bg-white p-8 shadow-2xl border-2 border-purple-200"
                >
                  {/* Top Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-t-3xl"></div>

                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>

                  <div className="relative space-y-6">
                    {/* Animated Stats Cards */}
                    {[
                      { icon: TrendingUp, label: 'Revenue Growth', value: '+127%', color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50' },
                      { icon: Car, label: 'Active Fleet', value: '136', color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
                      { icon: Users, label: 'Happy Customers', value: '12.5K', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        whileHover={{ scale: 1.05, x: 10 }}
                        className={`relative group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${item.bgColor} shadow-xl border-2 border-transparent hover:border-purple-300 transition-all`}
                      >
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300`}></div>

                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`relative p-4 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                        >
                          <item.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <div className="relative flex-1">
                          <div className="text-sm font-bold text-gray-600">{item.label}</div>
                          <div className="text-3xl font-extrabold text-gray-900">{item.value}</div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="relative w-3 h-3 rounded-full bg-green-500 shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-5 -left-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-full shadow-2xl font-extrabold text-sm border-2 border-white"
                >
                  🔥 Trending
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-5 -right-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-2.5 rounded-full shadow-2xl font-extrabold text-sm border-2 border-white"
                >
                  ⚡ Live
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
