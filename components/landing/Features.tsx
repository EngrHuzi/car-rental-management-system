'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  Car,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Chatbot',
    description:
      'Get instant answers and smart recommendations with our AI assistant trained on your fleet data.',
  },
  {
    icon: Car,
    title: 'Fleet Management',
    description:
      'Track 136+ vehicles across 39 brands with real-time availability and maintenance schedules.',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description:
      'Make data-driven decisions with comprehensive revenue, utilization, and customer satisfaction metrics.',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description:
      'Enterprise-grade security with JWT tokens, database-backed sessions, and email verification.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Fully responsive interface optimized for tablets and smartphones with touch-friendly interactions.',
  },
  {
    icon: Zap,
    title: 'Real-Time Insights',
    description:
      'Live dashboard updates, instant notifications, and automated business intelligence reports.',
  },
];

export function Features() {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500',
    'from-indigo-500 to-purple-500',
    'from-yellow-500 to-orange-500',
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Powerful Features
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-gray-900">in One Platform</span>
          </h2>
          <p className="text-xl text-gray-600">
            Powerful tools designed for modern rental businesses to scale and succeed
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center sm:place-items-stretch">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="relative group w-full max-w-sm"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index]} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>

                  <Card className="relative h-full bg-white border-0 shadow-xl overflow-hidden">
                    {/* Top Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[index]}`}></div>

                    <CardHeader className="pb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index]} shadow-lg`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-extrabold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-gray-700 leading-relaxed font-medium">
                        {feature.description}
                      </CardDescription>
                    </CardContent>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute bottom-4 right-4"
                    >
                      <div className={`p-2 rounded-full bg-gradient-to-br ${gradients[index]}`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <button className="group relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

              <Link
                href="/register"
                className="relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg shadow-xl transition-all duration-300 border-2 border-white"
              >
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                <span className="text-white font-extrabold text-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  Explore All Features
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
