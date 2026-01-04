'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  user: { email: string } | null;
  onLogout: () => void;
}

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/rentals', label: 'Rentals', icon: FileText },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white
          border-r border-gray-200 z-40
          flex flex-col shadow-lg
          transition-all duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                >
                  <Car className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RentalPro</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Logo */}
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
            >
              <Car className="h-5 w-5 text-white" />
            </motion.div>
          )}

          {/* Desktop Collapse Button */}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border border-gray-300 hover:border-indigo-300"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-indigo-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-indigo-600" />
            )}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative
                        ${isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      {/* Active indicator */}
                      {isActive && !isCollapsed && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <motion.div
                        whileHover={{ rotate: isActive ? 0 : 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'}`} />
                      </motion.div>

                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className={`font-semibold ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-indigo-600'}`}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Hover glow effect */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      )}
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - Fixed at bottom */}
        <div className="mt-auto border-t-2 border-gray-200">
          {/* User Info */}
          {user && !isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="m-4 px-3 py-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-gray-600 font-semibold">Signed in as</p>
              </div>
              <p className="text-sm font-bold text-gray-900 truncate">
                {user.email}
              </p>
            </motion.div>
          )}

          {/* User Icon when collapsed */}
          {user && isCollapsed && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex justify-center m-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user.email.charAt(0).toUpperCase()}
              </div>
            </motion.div>
          )}

          {/* Logout Button - Medium size at bottom */}
          {user && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-t border-gray-200"
            >
              <Button
                onClick={onLogout}
                className={`w-full h-10 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 font-bold shadow-lg hover:shadow-xl transition-all rounded-lg ${
                  isCollapsed ? 'px-0' : ''
                }`}
              >
                <LogOut className="h-4 w-4 text-white" />
                {!isCollapsed && <span className="ml-2 text-white">Logout</span>}
              </Button>
            </motion.div>
          )}
        </div>
      </aside>
    </>
  );
}
