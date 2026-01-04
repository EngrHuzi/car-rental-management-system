'use client';

interface SatisfactionMetricsProps {
  stats: {
    totalFeedback?: number;
    averageRating?: number;
    satisfactionRate?: number;
    ratingDistribution?: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
}

export default function SatisfactionMetrics({ stats }: SatisfactionMetricsProps) {
  const ratingDistribution = stats.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const maxCount = Math.max(...Object.values(ratingDistribution));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-6">Satisfaction Metrics</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium mb-1">Total Feedback</p>
          <p className="text-3xl font-bold text-blue-900">{stats.totalFeedback ?? 0}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium mb-1">Average Rating</p>
          <p className="text-3xl font-bold text-yellow-900">{(stats.averageRating ?? 0).toFixed(2)} / 5.0</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 font-medium mb-1">Satisfaction Rate</p>
          <p className="text-3xl font-bold text-green-900">{(stats.satisfactionRate ?? 0).toFixed(1)}%</p>
          <p className="text-xs text-green-600 mt-1">(4-5 star ratings)</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 mb-4">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingDistribution[rating as keyof typeof ratingDistribution] ?? 0;
          const percentage = (stats.totalFeedback ?? 0) > 0 ? (count / (stats.totalFeedback ?? 0)) * 100 : 0;

          return (
            <div key={rating} className="flex items-center">
              <span className="w-12 text-sm font-medium text-gray-700">{rating} ★</span>
              <div className="flex-1 mx-3">
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="w-16 text-sm text-gray-600 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
