'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, TrendingUp, Plus, Loader2 } from 'lucide-react';
import FeedbackList from '@/components/feedback/FeedbackList';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import SatisfactionMetrics from '@/components/feedback/SatisfactionMetrics';

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Metrics skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-6 bg-gray-200 rounded w-40 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
      {/* List skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b pb-4 last:border-b-0">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface Feedback {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  rental: {
    id: string;
    startDate: Date;
    endDate: Date;
    vehicle: {
      brand: string;
      model: string;
    };
    customer: {
      name: string;
      email: string;
    };
  };
}

interface Rental {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  vehicle: {
    brand: string;
    model: string;
  };
  customer: {
    name: string;
  };
}

interface Stats {
  totalFeedback: number;
  averageRating: number;
  satisfactionRate: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export default function FeedbackPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');

      // Fetch feedback, rentals, and stats in parallel
      const [feedbackRes, rentalsRes, statsRes] = await Promise.all([
        fetch('/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/rentals?status=completed', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/feedback/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (feedbackRes.status === 401 || rentalsRes.status === 401 || statsRes.status === 401) {
        router.push('/login');
        return;
      }

      const feedbackData = await feedbackRes.json();
      const rentalsData = await rentalsRes.json();
      const statsData = await statsRes.json();

      if (feedbackData.success) {
        setFeedback(feedbackData.data);
      }

      if (rentalsData.success) {
        // Filter out rentals that already have feedback
        const feedbackRentalIds = feedbackData.success
          ? feedbackData.data.map((fb: Feedback) => fb.rental.id)
          : [];
        const availableRentals = rentalsData.data.filter(
          (rental: Rental) => !feedbackRentalIds.includes(rental.id)
        );
        setRentals(availableRentals);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load feedback data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (feedbackData: {
    rentalId: string;
    rating: number;
    comment: string;
  }) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();

    if (data.success) {
      setShowForm(false);
      fetchData();
    } else {
      throw new Error(data.error?.message || 'Failed to submit feedback');
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading feedback...</p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg mb-3">
            <MessageSquare className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">Feedback Manager</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Customer Feedback
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Track customer satisfaction and manage feedback
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-white">{showForm ? 'Hide Form' : 'Submit Feedback'}</span>
        </motion.button>
      </div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={() => fetchData()}
            className="mt-2 text-red-600 hover:text-red-800 font-semibold text-sm underline"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Submit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackForm
              rentals={rentals}
              onSubmit={handleSubmitFeedback}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Satisfaction Metrics */}
      {stats ? (
        <div>
          <SatisfactionMetrics stats={stats} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative p-8 bg-white rounded-xl shadow-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-gray-600 font-medium">No metrics available yet. Submit feedback to see statistics.</p>
          </div>
        </motion.div>
      )}

      {/* Feedback List */}
      {feedback.length > 0 ? (
        <FeedbackList feedback={feedback} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white rounded-xl shadow-xl p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-gray-700 text-lg font-semibold mb-2">No feedback submitted yet.</p>
            {rentals.length > 0 ? (
              <p className="text-gray-500">Submit feedback for your completed rentals to get started.</p>
            ) : (
              <p className="text-gray-500">Complete a rental to submit feedback.</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
