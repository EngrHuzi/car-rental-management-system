'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, Mail, Phone, UserPlus, X } from 'lucide-react';

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerFormProps {
  customer?: Customer | null;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  onCancel: () => void;
}

export default function CustomerForm({
  customer,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      // Reset form if creating new customer
      if (!customer) {
        setName('');
        setEmail('');
        setPhone('');
      }
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

      <Card className="relative border-0 shadow-2xl overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
              >
                <UserPlus className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {customer ? 'Edit Customer' : 'Add New Customer'}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium mt-1">
                  {customer
                    ? 'Update customer information below'
                    : 'Fill in the details to add a new customer'}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl"
              >
                <p className="text-sm text-red-800 font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter full name"
                  className="pl-11 h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email address"
                  className="pl-11 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                Phone Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter phone number"
                  className="pl-11 h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>{customer ? 'Update Customer' : 'Add Customer'}</span>
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={onCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </motion.button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
