'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Car as CarIcon, CheckCircle, XCircle } from 'lucide-react';
import VehicleList from '@/components/vehicles/VehicleList';
import VehicleForm from '@/components/vehicles/VehicleForm';

interface Vehicle {
  id: string;
  model: string;
  brand: string;
  dailyPrice: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [meta, setMeta] = useState({ total: 0, available: 0, unavailable: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchVehicles();
  }, [router]);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setVehicles(data.data);
        setMeta(data.meta);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (vehicleData: { model: string; brand: string; dailyPrice: number }) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (data.success) {
      setShowForm(false);
      fetchVehicles();
    } else {
      throw new Error(data.error?.message || 'Failed to add vehicle');
    }
  };

  const handleUpdateVehicle = async (vehicleData: { model: string; brand: string; dailyPrice: number }) => {
    if (!editingVehicle) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/cars/${editingVehicle.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (data.success) {
      setEditingVehicle(null);
      fetchVehicles();
    } else {
      throw new Error(data.error?.message || 'Failed to update vehicle');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/cars/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      fetchVehicles();
    } else {
      alert(data.error?.message || 'Failed to delete vehicle');
    }
  };

  const handleToggleAvailability = async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/cars/${id}/availability`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      fetchVehicles();
    } else {
      alert(data.error?.message || 'Failed to toggle availability');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading vehicles...</p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg mb-3">
            <CarIcon className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">Fleet Manager</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Fleet Management
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your vehicle fleet and availability
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingVehicle(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-white">{showForm ? 'Hide Form' : 'Add New Vehicle'}</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Vehicles</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{meta.total}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg"
              >
                <CarIcon className="h-6 w-6 text-white" />
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
                <p className="text-sm font-semibold text-gray-600">Available</p>
                <p className="mt-2 text-3xl font-extrabold text-green-600">{meta.available}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
              >
                <CheckCircle className="h-6 w-6 text-white" />
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Unavailable</p>
                <p className="mt-2 text-3xl font-extrabold text-red-600">{meta.unavailable}</p>
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

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(showForm || editingVehicle) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VehicleForm
              vehicle={editingVehicle}
              onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
              onCancel={() => {
                setEditingVehicle(null);
                setShowForm(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle List */}
      <VehicleList
        vehicles={vehicles}
        onEdit={setEditingVehicle}
        onDelete={handleDeleteVehicle}
        onToggleAvailability={handleToggleAvailability}
      />
    </div>
  );
}
