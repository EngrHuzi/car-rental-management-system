'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface RevenueChartProps {
  data: Array<{ date: string; revenue: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <Card className="relative border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Revenue Trend
                </CardTitle>
                <CardDescription className="font-medium">Daily revenue over time</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-3 mx-auto w-fit">
                  <BarChart3 className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 font-semibold">No revenue data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = totalRevenue / data.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
      <Card className="relative border-0 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Revenue Trend
              </CardTitle>
              <CardDescription className="font-medium text-gray-600">
                Daily revenue over the last {data.length} days | Avg: <span className="font-bold text-green-600">${avgRevenue.toFixed(2)}/day</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart */}
            <div className="h-[300px] flex items-end gap-2 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
              {data.map((item, index) => {
                const heightPercent = (item.revenue / maxRevenue) * 100;
                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                    className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg hover:from-green-600 hover:to-emerald-500 transition-all relative group/bar shadow-lg"
                    title={`${item.date}: $${item.revenue.toFixed(2)}`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover/bar:block bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-10 shadow-xl">
                      <div className="font-bold">{item.date}</div>
                      <div className="text-green-300">${item.revenue.toFixed(2)}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div className="text-xs font-bold text-gray-600">Total Revenue</div>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${totalRevenue.toFixed(2)}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <div className="text-xs font-bold text-gray-600">Average Revenue</div>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  ${avgRevenue.toFixed(2)}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <div className="text-xs font-bold text-gray-600">Peak Revenue</div>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${maxRevenue.toFixed(2)}
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
