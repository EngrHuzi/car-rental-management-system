'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import RentalList from '@/components/rentals/RentalList';
import RentalForm from '@/components/rentals/RentalForm';

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

export default function RentalsPage() {
  const router = useRouter();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [meta, setMeta] = useState({ total: 0, active: 0, completed: 0, cancelled: 0 });

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
      const token = localStorage.getItem('token');

      // Fetch rentals, vehicles, and customers in parallel
      const [rentalsRes, vehiclesRes, customersRes] = await Promise.all([
        fetch('/api/rentals', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/cars', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const rentalsData = await rentalsRes.json();
      const vehiclesData = await vehiclesRes.json();
      const customersData = await customersRes.json();

      if (rentalsData.success) {
        setRentals(rentalsData.data);
        setMeta(rentalsData.meta);
      }

      if (vehiclesData.success) {
        setVehicles(vehiclesData.data);
      }

      if (customersData.success) {
        setCustomers(customersData.data);
      }

      if (rentalsRes.status === 401 || vehiclesRes.status === 401 || customersRes.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRental = async (rentalData: {
    vehicleId: string;
    customerId: string;
    startDate: string;
    endDate: string;
  }) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rentalData),
    });

    const data = await response.json();

    if (data.success) {
      setShowForm(false);
      fetchData();
    } else {
      throw new Error(data.error?.message || 'Failed to create rental');
    }
  };

  const handleCancelRental = async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/rentals/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      fetchData();
    } else {
      alert(data.error?.message || 'Failed to cancel rental');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading rentals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg mb-3">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">Rental Manager</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Rental Management
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage all vehicle rentals in one place
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-white">{showForm ? 'Hide Form' : 'Create New Rental'}</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Rentals</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{meta.total}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
              >
                <TrendingUp className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Active</p>
                <p className="mt-2 text-3xl font-extrabold text-green-600">{meta.active}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
              >
                <Clock className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Completed</p>
                <p className="mt-2 text-3xl font-extrabold text-blue-600">{meta.completed}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg"
              >
                <CheckCircle className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Cancelled</p>
                <p className="mt-2 text-3xl font-extrabold text-red-600">{meta.cancelled}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg"
              >
                <XCircle className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RentalForm
              vehicles={vehicles}
              customers={customers}
              onSubmit={handleCreateRental}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rental List */}
      <RentalList rentals={rentals} onCancel={handleCancelRental} />
    </div>
  );
}
