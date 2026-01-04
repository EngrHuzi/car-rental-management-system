'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
  user?: { email: string } | null;
  onLogout?: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
  user,
  onLogout,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="p-4 border-b border-gray-200">
                  <div className="text-sm text-gray-600">
                    Logged in as
                  </div>
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              {onLogout && (
                <div className="p-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    variant="destructive"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
