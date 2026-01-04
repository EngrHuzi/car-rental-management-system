'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import RentalCard from './RentalCard';

interface Rental {
  id: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  vehicle: {
    id: string;
    brand: string;
    model: string;
    dailyPrice: number;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface RentalListProps {
  rentals: Rental[];
  onCancel: (id: string) => void;
}

export default function RentalList({ rentals, onCancel }: RentalListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRentals = rentals.filter((rental) => {
    if (filter === 'active' && rental.status !== 'active') return false;
    if (filter === 'completed' && rental.status !== 'completed') return false;
    if (filter === 'cancelled' && rental.status !== 'canceled') return false;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        rental.customer.name.toLowerCase().includes(search) ||
        rental.vehicle.model.toLowerCase().includes(search) ||
        rental.vehicle.brand.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const filterButtons = [
    { key: 'all' as const, label: 'All', gradient: 'from-gray-600 to-gray-700' },
    { key: 'active' as const, label: 'Active', gradient: 'from-green-600 to-emerald-600' },
    { key: 'completed' as const, label: 'Completed', gradient: 'from-blue-600 to-indigo-600' },
    { key: 'cancelled' as const, label: 'Cancelled', gradient: 'from-red-600 to-rose-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-gray-600 hidden lg:block" />
            {filterButtons.map(({ key, label, gradient }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(key)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  filter === key
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredRentals.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{rentals.length}</span> rentals
          </p>
        </div>
      </div>

      {/* Rental grid */}
      {filteredRentals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-lg"
        >
          <div className="mb-4">
            <div className="inline-flex p-4 bg-gray-50 rounded-full">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rentals found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRentals.map((rental, index) => (
            <motion.div
              key={rental.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RentalCard rental={rental} onCancel={onCancel} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
