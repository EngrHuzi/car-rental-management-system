'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, User, Calendar, DollarSign, X, FileText } from 'lucide-react';

interface RentalFormData {
  vehicleId: string;
  customerId: string;
  startDate: string;
  endDate: string;
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  dailyPrice: number;
  isAvailable: boolean;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  isDeleted: boolean;
}

interface RentalFormProps {
  vehicles: Vehicle[];
  customers: Customer[];
  onSubmit: (data: RentalFormData) => Promise<void>;
  onCancel: () => void;
}

export default function RentalForm({
  vehicles,
  customers,
  onSubmit,
  onCancel,
}: RentalFormProps) {
  const [vehicleId, setVehicleId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  // Filter available vehicles and active customers
  const availableVehicles = vehicles.filter((v) => v.isAvailable);
  const activeCustomers = customers.filter((c) => !c.isDeleted);

  // Calculate estimated cost when vehicle and dates are selected
  useEffect(() => {
    if (vehicleId && startDate && endDate) {
      const vehicle = vehicles.find((v) => v.id === vehicleId);
      if (vehicle) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (days > 0) {
          setEstimatedCost(days * vehicle.dailyPrice);
        } else {
          setEstimatedCost(null);
        }
      }
    } else {
      setEstimatedCost(null);
    }
  }, [vehicleId, startDate, endDate, vehicles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit({
        vehicleId,
        customerId,
        startDate,
        endDate,
      });

      // Reset form
      setVehicleId('');
      setCustomerId('');
      setStartDate('');
      setEndDate('');
      setEstimatedCost(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

      <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-xl border-0 shadow-2xl overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>

        <div className="mb-6 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create New Rental
            </h3>
            <p className="text-sm text-gray-600 font-medium">Fill in the details to create a new rental agreement</p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl"
          >
            <p className="text-sm text-red-800 font-semibold">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="customerId" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              Customer <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl font-medium text-gray-900 transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="">Select a customer</option>
                {activeCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="vehicleId" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              Vehicle <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Car className="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="vehicleId"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-medium text-gray-900 transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="">Select a vehicle</option>
                {availableVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} - ${vehicle.dailyPrice.toFixed(2)}/day
                  </option>
                ))}
              </select>
            </div>
            {availableVehicles.length === 0 && (
              <p className="text-sm text-red-600 mt-2 font-semibold">No available vehicles</p>
            )}
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-11 pr-4 py-3 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl font-medium text-gray-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-11 pr-4 py-3 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl font-medium text-gray-900 transition-all"
              />
            </div>
          </div>
        </div>

        {estimatedCost !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600">Estimated Total Cost</p>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${estimatedCost.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3 pt-2">
          <motion.button
            type="submit"
            disabled={loading || availableVehicles.length === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>{loading ? 'Creating...' : 'Create Rental'}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 h-12 px-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
