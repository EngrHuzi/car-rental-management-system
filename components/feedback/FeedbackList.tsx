'use client';

import { useState } from 'react';

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

interface FeedbackListProps {
  feedback: Feedback[];
}

export default function FeedbackList({ feedback }: FeedbackListProps) {
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeedback = feedback.filter((fb) => {
    // Filter by rating
    if (filter !== 'all' && fb.rating !== parseInt(filter)) return false;

    // Filter by search term (customer name, vehicle model/brand)
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        fb.rental.customer.name.toLowerCase().includes(search) ||
        fb.rental.vehicle.model.toLowerCase().includes(search) ||
        fb.rental.vehicle.brand.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by customer or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating.toString() as any)}
              className={`px-4 py-2 rounded-md font-medium ${
                filter === rating.toString()
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredFeedback.length} of {feedback.length} feedback entries
      </div>

      {/* Feedback list */}
      {filteredFeedback.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No feedback found matching your criteria
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedback.map((fb) => (
            <div key={fb.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {fb.rental.vehicle.brand} {fb.rental.vehicle.model}
                  </h3>
                  <p className="text-sm text-gray-600">{fb.rental.customer.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>{renderStars(fb.rating)}</div>
              </div>

              {fb.comment && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">{fb.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
