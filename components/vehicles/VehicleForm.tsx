'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Car, DollarSign, X } from 'lucide-react';

interface Vehicle {
  id?: string;
  model: string;
  brand: string;
  dailyPrice: number;
}

interface VehicleFormData {
  model: string;
  brand: string;
  dailyPrice: number;
}

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  onCancel: () => void;
}

export default function VehicleForm({
  vehicle,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [dailyPrice, setDailyPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setModel(vehicle.model);
      setBrand(vehicle.brand);
      setDailyPrice(vehicle.dailyPrice.toString());
    }
  }, [vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const price = parseFloat(dailyPrice);
      if (isNaN(price) || price <= 0) {
        setError('Daily price must be a positive number');
        setLoading(false);
        return;
      }

      await onSubmit({
        model: model.trim(),
        brand: brand.trim(),
        dailyPrice: price,
      });

      // Reset form if creating new vehicle
      if (!vehicle) {
        setModel('');
        setBrand('');
        setDailyPrice('');
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

      <Card className="relative border-0 shadow-2xl overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg"
              >
                <Car className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium mt-1">
                  {vehicle
                    ? 'Update vehicle information below'
                    : 'Fill in the details to add a new vehicle to your fleet'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Brand Field */}
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  Brand <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Car className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    placeholder="e.g., Toyota"
                    className="pl-11 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Model Field */}
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Car className="w-4 h-4 text-cyan-600" />
                  Model <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Car className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    placeholder="e.g., Camry"
                    className="pl-11 h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Daily Price Field */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dailyPrice" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Daily Price ($) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="dailyPrice"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(e.target.value)}
                    required
                    placeholder="45.00"
                    className="pl-11 h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Car className="w-5 h-5" />
                    <span>{vehicle ? 'Update Vehicle' : 'Add Vehicle'}</span>
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
