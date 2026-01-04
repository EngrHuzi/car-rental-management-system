'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Car } from 'lucide-react';
import VehicleCard from './VehicleCard';

interface Vehicle {
  id: string;
  model: string;
  brand: string;
  dailyPrice: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface VehicleListProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

export default function VehicleList({
  vehicles,
  onEdit,
  onDelete,
  onToggleAvailability,
}: VehicleListProps) {
  const [filter, setFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === 'available' && !vehicle.isAvailable) return false;
    if (filter === 'unavailable' && vehicle.isAvailable) return false;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        vehicle.model.toLowerCase().includes(search) ||
        vehicle.brand.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const filterButtons = [
    { key: 'all' as const, label: 'All', gradient: 'from-gray-600 to-gray-700' },
    { key: 'available' as const, label: 'Available', gradient: 'from-green-600 to-emerald-600' },
    { key: 'unavailable' as const, label: 'Unavailable', gradient: 'from-red-600 to-rose-600' },
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
              placeholder="Search by model or brand..."
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
            Showing <span className="font-semibold text-gray-900">{filteredVehicles.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{vehicles.length}</span> vehicles
          </p>
        </div>
      </div>

      {/* Vehicle grid */}
      {filteredVehicles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-lg"
        >
          <div className="mb-4">
            <div className="inline-flex p-4 bg-gray-50 rounded-full">
              <Car className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <VehicleCard
                vehicle={vehicle}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleAvailability={onToggleAvailability}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
