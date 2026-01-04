'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, FileText, Edit, Trash2, User } from 'lucide-react';

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

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export default function CustomerCard({
  customer,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  const rentalCount = customer._count?.rentals || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

      <Card className="relative border-0 shadow-xl overflow-hidden bg-white">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

        <CardContent className="p-6">
          {/* Header with Avatar and Status */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Name */}
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                  {customer.name}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-700">
                    {customer.isDeleted ? 'Inactive' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Deleted Badge */}
            {customer.isDeleted && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
              >
                Deleted
              </motion.span>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Email Address</p>
                <p className="text-sm font-bold text-gray-900 truncate">{customer.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Phone Number</p>
                <p className="text-sm font-bold text-gray-900">{customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Rental Count Badge */}
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-md">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">Total Rentals</p>
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {rentalCount}
                  </p>
                </div>
              </div>
              <span className="text-sm font-bold text-indigo-600">
                {rentalCount === 1 ? 'rental' : 'rentals'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {!customer.isDeleted && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(customer)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (
                    confirm(
                      rentalCount > 0
                        ? `${customer.name} has ${rentalCount} rental(s). This will soft delete the customer. Continue?`
                        : `Are you sure you want to delete ${customer.name}?`
                    )
                  ) {
                    onDelete(customer.id);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </motion.button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
