'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Activity, TrendingUp, AlertCircle } from 'lucide-react';

interface UtilizationChartProps {
  data: Array<{ date: string; utilization: number }>;
}

export function UtilizationChart({ data }: UtilizationChartProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <Card className="relative border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Fleet Utilization
                </CardTitle>
                <CardDescription className="font-medium">Vehicle utilization percentage over time</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-3 mx-auto w-fit">
                  <Car className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 font-semibold">No utilization data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const avgUtilization =
    data.reduce((sum, d) => sum + d.utilization, 0) / data.length;
  const maxUtilization = Math.max(...data.map((d) => d.utilization));

  const getUtilizationGradient = (utilization: number) => {
    if (utilization >= 80) return 'from-red-500 to-orange-500';
    if (utilization >= 50) return 'from-green-500 to-emerald-500';
    return 'from-yellow-500 to-amber-500';
  };

  const getStatusInfo = (avg: number) => {
    if (avg >= 80) return { label: 'High', icon: AlertCircle, gradient: 'from-red-600 to-orange-600', bgGradient: 'from-red-50 to-orange-50', border: 'border-red-200' };
    if (avg >= 50) return { label: 'Good', icon: Activity, gradient: 'from-green-600 to-emerald-600', bgGradient: 'from-green-50 to-emerald-50', border: 'border-green-200' };
    return { label: 'Low', icon: TrendingUp, gradient: 'from-yellow-600 to-amber-600', bgGradient: 'from-yellow-50 to-amber-50', border: 'border-yellow-200' };
  };

  const statusInfo = getStatusInfo(avgUtilization);
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
      <Card className="relative border-0 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Fleet Utilization
              </CardTitle>
              <CardDescription className="font-medium text-gray-600">
                Vehicle utilization over the last {data.length} days | Avg: <span className="font-bold text-blue-600">{avgUtilization.toFixed(1)}%</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Chart */}
            <div className="h-[300px] flex items-end gap-2 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
              {data.map((item, index) => {
                const heightPercent = item.utilization;
                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ delay: index * 0.05, type: 'spring' }}
                    className={`flex-1 bg-gradient-to-t ${getUtilizationGradient(item.utilization)} rounded-t-lg transition-all relative group/bar shadow-lg hover:opacity-90`}
                    title={`${item.date}: ${item.utilization.toFixed(1)}%`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover/bar:block bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-10 shadow-xl">
                      <div className="font-bold">{item.date}</div>
                      <div className="text-cyan-300">{item.utilization.toFixed(1)}%</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <div className="text-xs font-bold text-gray-600">Average</div>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {avgUtilization.toFixed(1)}%
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <div className="text-xs font-bold text-gray-600">Maximum</div>
                </div>
                <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {maxUtilization.toFixed(1)}%
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${statusInfo.bgGradient} border-2 ${statusInfo.border}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <StatusIcon className={`w-4 h-4 bg-gradient-to-r ${statusInfo.gradient} bg-clip-text text-transparent`} />
                  <div className="text-xs font-bold text-gray-600">Status</div>
                </div>
                <div className={`text-2xl font-extrabold bg-gradient-to-r ${statusInfo.gradient} bg-clip-text text-transparent`}>
                  {statusInfo.label}
                </div>
              </motion.div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded shadow-md"></div>
                <span className="text-xs font-bold text-gray-700">&lt;50% Low</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded shadow-md"></div>
                <span className="text-xs font-bold text-gray-700">50-79% Good</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded shadow-md"></div>
                <span className="text-xs font-bold text-gray-700">≥80% High</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
