'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CustomerCard from './CustomerCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Users } from 'lucide-react';

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

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export default function CustomerList({
  customers,
  onEdit,
  onDelete,
}: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    // Filter by deleted status
    if (!showDeleted && customer.isDeleted) return false;

    // Filter by search term (name or email)
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <Card className="relative border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg font-medium"
                />
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                <Checkbox
                  id="showDeleted"
                  checked={showDeleted}
                  onCheckedChange={(checked) => setShowDeleted(checked as boolean)}
                  className="border-2"
                />
                <Label
                  htmlFor="showDeleted"
                  className="text-sm font-bold text-gray-700 cursor-pointer"
                >
                  Show deleted
                </Label>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 w-fit">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                Showing {filteredCustomers.length} of {customers.length} customers
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customer grid */}
      {filteredCustomers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <Card className="relative border-0 shadow-xl">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-700 mb-2">No customers found</p>
                <p className="text-sm text-gray-500">
                  {searchTerm
                    ? 'Try adjusting your search criteria'
                    : 'Get started by adding your first customer'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
