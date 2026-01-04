'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Car,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Calendar,
  Star,
} from 'lucide-react';

interface StatsData {
  totalVehicles: number;
  activeRentals: number;
  totalCustomers: number;
  revenue?: number;
  utilization?: number;
  satisfaction?: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/analytics/kpis', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.kpis);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2 shimmer" />
          <Skeleton className="h-4 w-96 shimmer" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 shimmer" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Vehicles',
      value: stats?.totalVehicles || 0,
      icon: Car,
      change: '+12%',
      trending: 'up',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Active Rentals',
      value: stats?.activeRentals || 0,
      icon: FileText,
      change: '+8%',
      trending: 'up',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      change: '+23%',
      trending: 'up',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Fleet Utilization',
      value: stats?.utilization ? `${(Number(stats.utilization) * 100).toFixed(1)}%` : '0%',
      icon: Activity,
      change: '+5%',
      trending: 'up',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const quickActions = [
    {
      title: 'New Rental',
      description: 'Create a new rental booking',
      icon: Calendar,
      href: '/rentals',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Add Vehicle',
      description: 'Register a new vehicle',
      icon: Car,
      href: '/vehicles',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'View Analytics',
      description: 'Check business insights',
      icon: TrendingUp,
      href: '/analytics',
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg mb-4">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-semibold">Live Dashboard</span>
        </div>
        <h1 className="text-4xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Overview
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Welcome back! Here's what's happening with your rental business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300`}></div>

              <Card className="relative overflow-hidden border-0 shadow-xl bg-white">
                {/* Top Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                      <TrendIcon className="h-4 w-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-green-500 to-emerald-500',
            ];
            return (
              <motion.a
                key={action.title}
                href={action.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[index]} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300`}></div>

                <Card className="relative border-0 shadow-xl bg-white cursor-pointer overflow-hidden">
                  {/* Top Gradient Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index]}`}></div>

                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${gradients[index]} shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity / Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

          <Card className="relative border-0 shadow-xl bg-white overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Total Revenue
                  </p>
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${stats?.revenue ? Number(stats.revenue).toLocaleString() : '0'}
                  </p>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  75% of monthly target achieved
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Satisfaction Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

          <Card className="relative border-0 shadow-xl bg-white overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>

            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                Customer Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Average Rating
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      {stats?.satisfaction ? Number(stats.satisfaction).toFixed(1) : '0.0'}
                    </p>
                    <p className="text-sm text-gray-500">/ 5.0</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + star * 0.1, type: 'spring' }}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= Number(stats?.satisfaction || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Based on customer feedback
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
