'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerList from '@/components/customers/CustomerList';
import CustomerForm from '@/components/customers/CustomerForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Users, UserCheck, UserX, Plus, Loader2 } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    rentals: number;
  };
}

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [meta, setMeta] = useState({ total: 0, active: 0, deleted: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchCustomers();
  }, [router]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/customers?includeDeleted=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCustomers(data.data);
        setMeta(data.meta);
      } else if (response.status === 401) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      toast.error('Failed to fetch customers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (customerData: { name: string; email: string; phone: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });

    const data = await response.json();

    if (data.success) {
      setShowForm(false);
      fetchCustomers();
      toast.success('Customer added successfully!');
    } else {
      throw new Error(data.error?.message || 'Failed to add customer');
    }
  };

  const handleUpdateCustomer = async (customerData: { name: string; email: string; phone: string }) => {
    if (!editingCustomer) return;

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/customers/${editingCustomer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });

    const data = await response.json();

    if (data.success) {
      setEditingCustomer(null);
      fetchCustomers();
      toast.success('Customer updated successfully!');
    } else {
      throw new Error(data.error?.message || 'Failed to update customer');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      fetchCustomers();
      toast.success(
        data.deletionType === 'soft'
          ? 'Customer soft deleted (has rental history)'
          : 'Customer deleted successfully'
      );
    } else {
      toast.error(data.error?.message || 'Failed to delete customer');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading customers...</p>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg mb-3">
            <Users className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold">Customer Manager</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Customer Management
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your customers and track their rental history
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingCustomer(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span className="text-white">{showForm ? 'Hide Form' : 'Add New Customer'}</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                <p className="text-sm font-semibold text-gray-600">Total Customers</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{meta.total}</p>
                <p className="text-xs text-gray-500 mt-1">All registered customers</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
              >
                <Users className="h-6 w-6 text-white" />
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>

          <div className="relative bg-white rounded-xl p-6 border-0 shadow-xl overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Active Customers</p>
                <p className="mt-2 text-3xl font-extrabold text-blue-600">{meta.active}</p>
                <p className="text-xs text-gray-500 mt-1">Currently active accounts</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg"
              >
                <UserCheck className="h-6 w-6 text-white" />
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
                <p className="text-sm font-semibold text-gray-600">Deleted Customers</p>
                <p className="mt-2 text-3xl font-extrabold text-red-600">{meta.deleted}</p>
                <p className="text-xs text-gray-500 mt-1">Soft-deleted accounts</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg"
              >
                <UserX className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {(showForm || editingCustomer) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CustomerForm
              customer={editingCustomer}
              onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
              onCancel={() => {
                setEditingCustomer(null);
                setShowForm(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer List */}
      <CustomerList
        customers={customers}
        onEdit={setEditingCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
}
