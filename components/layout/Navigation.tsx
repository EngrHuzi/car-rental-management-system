'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';

interface NavigationProps {
  user?: { email: string } | null;
  onLogout?: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/vehicles', label: 'Vehicles', icon: '🚗' },
  { href: '/customers', label: 'Customers', icon: '👥' },
  { href: '/rentals', label: 'Rentals', icon: '📋' },
  { href: '/feedback', label: 'Feedback', icon: '💬' },
  { href: '/ai-chat', label: 'AI Assistant', icon: '🤖' },
  { href: '/analytics', label: 'Analytics', icon: '📊' },
];

export function Navigation({ user, onLogout }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <span className="text-2xl">🚗</span>
              <span className="hidden sm:inline">Car Rental</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:ml-8 md:space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Menu and Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {user && (
              <span className="hidden sm:inline-block text-sm text-gray-700">
                {user.email}
              </span>
            )}

            {onLogout && (
              <Button
                onClick={onLogout}
                variant="destructive"
                size="sm"
                className="hidden md:inline-flex"
              >
                Logout
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={pathname}
        user={user}
        onLogout={onLogout}
      />
    </nav>
  );
}
