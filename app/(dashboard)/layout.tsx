'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import Chatbot from '@/components/chatbot/Chatbot';
import { Car, Users, BarChart, Zap } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white mx-auto mb-4"></div>
          </div>
          <p className="text-black dark:text-white font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const floatingIcons = [
    { Icon: Car, color: 'text-blue-500', delay: 0, x: '10%', y: '20%' },
    { Icon: Users, color: 'text-purple-500', delay: 0.2, x: '80%', y: '30%' },
    { Icon: BarChart, color: 'text-green-500', delay: 0.4, x: '15%', y: '70%' },
    { Icon: Zap, color: 'text-yellow-500', delay: 0.6, x: '85%', y: '60%' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
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
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
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
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-15"
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
          className="absolute hidden lg:block pointer-events-none"
          style={{ left: item.x, top: item.y }}
        >
          <item.Icon className={`w-12 h-12 ${item.color}`} />
        </motion.div>
      ))}

      <Sidebar user={user} onLogout={handleLogout} />
      <main className="lg:pl-64 transition-all duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Chatbot />
      <Toaster />
    </div>
  );
}
