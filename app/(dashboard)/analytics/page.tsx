'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart3, DollarSign, TrendingUp, Star, Users, Car, FileText, Loader2, Sparkles } from 'lucide-react';
import { KPICard } from '@/components/analytics/KPICard';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { UtilizationChart } from '@/components/analytics/UtilizationChart';
import { SatisfactionChart } from '@/components/analytics/SatisfactionChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KPIData {
  revenue: string;
  utilization: string;
  satisfaction: string;
  activeRentals: number;
  totalCustomers: number;
  totalVehicles: number;
}

interface TrendData {
  revenue: Array<{ date: string; revenue: number }>;
  utilization: Array<{ date: string; utilization: number }>;
  satisfaction: Array<{ date: string; satisfaction: number; count: number }>;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [trends, setTrends] = useState<TrendData | null>(null);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
    loadAnalytics(token);
  }, [router, period]);

  const loadAnalytics = async (token: string) => {
    setIsLoading(true);
    try {
      // Load KPIs and trends in parallel
      const [kpisResponse, trendsResponse] = await Promise.all([
        fetch('/api/analytics/kpis', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/analytics/trends?days=${period}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (kpisResponse.ok) {
        const kpisData = await kpisResponse.json();
        setKpis(kpisData.data.kpis);
      }

      if (trendsResponse.ok) {
        const trendsData = await trendsResponse.json();
        setTrends(trendsData.data.trends);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAIInsights = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoadingInsights(true);
    try {
      const response = await fetch('/api/ai/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAiInsights(data.data.insights);
      }
    } catch (error) {
      console.error('Failed to load AI insights:', error);
      setAiInsights('Failed to load AI insights. Please try again later.');
    } finally {
      setLoadingInsights(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg mb-3">
            <BarChart3 className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">Analytics Dashboard</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Business Analytics
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Key performance indicators and business insights
          </p>
        </motion.div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPeriod(7)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 7
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            7 Days
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPeriod(30)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 30
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            30 Days
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPeriod(90)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              period === 90
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            90 Days
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">${kpis.revenue}</p>
                  <p className="text-xs text-gray-500 mt-1">All-time rental revenue</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
                >
                  <DollarSign className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Fleet Utilization</p>
                  <p className="mt-2 text-3xl font-extrabold text-blue-600">{kpis.utilization}%</p>
                  <p className="text-xs text-gray-500 mt-1">{kpis.totalVehicles - Math.round((parseFloat(kpis.utilization) / 100) * kpis.totalVehicles)} vehicles available</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg"
                >
                  <Car className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Customer Satisfaction</p>
                  <p className="mt-2 text-3xl font-extrabold text-orange-600">{kpis.satisfaction}/5.0</p>
                  <p className="text-xs text-gray-500 mt-1">Average rating from feedback</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg"
                >
                  <Star className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Active Rentals</p>
                  <p className="mt-2 text-3xl font-extrabold text-purple-600">{kpis.activeRentals}</p>
                  <p className="text-xs text-gray-500 mt-1">Currently ongoing rentals</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
                >
                  <FileText className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Customers</p>
                  <p className="mt-2 text-3xl font-extrabold text-indigo-600">{kpis.totalCustomers}</p>
                  <p className="text-xs text-gray-500 mt-1">Active customer accounts</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg"
                >
                  <Users className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Fleet Size</p>
                  <p className="mt-2 text-3xl font-extrabold text-teal-600">{kpis.totalVehicles}</p>
                  <p className="text-xs text-gray-500 mt-1">Total vehicles in inventory</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl shadow-lg"
                >
                  <TrendingUp className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Trend Charts */}
      {trends && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={trends.revenue} />
          <UtilizationChart data={trends.utilization} />
          <div className="lg:col-span-2">
            <SatisfactionChart data={trends.satisfaction} />
          </div>
        </div>
      )}

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <Card className="relative border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AI-Powered Insights
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Intelligent analysis of your business performance
                </CardDescription>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadAIInsights}
                disabled={loadingInsights}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingInsights ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  'Get AI Insights'
                )}
              </motion.button>
            </div>
          </CardHeader>
          <CardContent>
            {aiInsights ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                  <p className="text-gray-700 leading-relaxed">{aiInsights}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                    <Sparkles className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <p className="text-gray-600 font-medium">
                  Click "Get AI Insights" to receive intelligent recommendations and analysis
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  based on your current metrics
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
