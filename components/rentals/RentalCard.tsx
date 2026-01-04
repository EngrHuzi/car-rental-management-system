'use client';

import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, DollarSign, Car } from 'lucide-react';

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

interface RentalCardProps {
  rental: Rental;
  onCancel: (id: string) => void;
}

export default function RentalCard({ rental, onCancel }: RentalCardProps) {
  const startDate = new Date(rental.startDate);
  const endDate = new Date(rental.endDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
    active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    completed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    canceled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  };

  const config = statusConfig[rental.status] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
    >
      {/* Status Bar */}
      <div className={`h-1.5 ${rental.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : rental.status === 'completed' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`}></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Car className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {rental.vehicle.brand} {rental.vehicle.model}
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-medium">{rental.customer.name}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
            {rental.status.toUpperCase()}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-blue-600 " />
            <span>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-md text-xs font-medium">
                {days} {days === 1 ? 'day' : 'days'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Mail className="h-4 w-4 text-purple-600 " />
            <span className="truncate">{rental.customer.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Phone className="h-4 w-4 text-green-600 " />
            <span>{rental.customer.phone}</span>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50   rounded-xl border border-blue-100  mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${rental.totalCost.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                ${rental.vehicle.dailyPrice.toFixed(2)}/day × {days} {days === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Actions */}
        {rental.status === 'active' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (confirm(`Cancel rental for ${rental.customer.name}?`)) {
                onCancel(rental.id);
              }
            }}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-medium shadow-lg transition-all"
          >
            Cancel Rental
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
