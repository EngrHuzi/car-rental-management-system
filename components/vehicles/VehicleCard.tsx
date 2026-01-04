'use client';

import { motion } from 'framer-motion';
import { Car, DollarSign, Edit2, Trash2, Power, PowerOff } from 'lucide-react';

interface Vehicle {
  id: string;
  model: string;
  brand: string;
  dailyPrice: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onToggleAvailability,
}: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
    >
      {/* Status Bar */}
      <div className={`h-1.5 ${vehicle.isAvailable ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`}></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Car className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {vehicle.brand} {vehicle.model}
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-medium">{vehicle.brand}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            vehicle.isAvailable
              ? 'bg-green-50  text-green-700  border-green-200 '
              : 'bg-red-50  text-red-700  border-red-200 '
          }`}>
            {vehicle.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
          </span>
        </div>

        {/* Price */}
        <div className="mb-5 p-4 bg-gradient-to-br from-blue-50 to-purple-50   rounded-xl border border-blue-100 ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Daily Rate</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-gray-900">${vehicle.dailyPrice.toFixed(2)}</p>
                <span className="text-sm text-gray-500">/day</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggleAvailability(vehicle.id)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
              vehicle.isAvailable
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg'
            }`}
          >
            {vehicle.isAvailable ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
            Mark as {vehicle.isAvailable ? 'Unavailable' : 'Available'}
          </motion.button>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEdit(vehicle)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg transition-all"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (confirm(`Delete ${vehicle.brand} ${vehicle.model}?`)) {
                  onDelete(vehicle.id);
                }
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-medium shadow-lg transition-all"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
