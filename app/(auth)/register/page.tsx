'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Mail, Sparkles, Zap, Chrome } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: '', color: '' };
    if (pwd.length < 8) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (pwd.length < 12 && !/[0-9]/.test(pwd)) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (pwd.length >= 12 || (/[0-9]/.test(pwd) && /[A-Z]/.test(pwd))) return { strength: 3, label: 'Strong', color: 'bg-green-500' };
    return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Show success message for 3 seconds before redirecting
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-shadow">
            <Car className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RentalPro</span>
        </Link>

        {/* Glow container */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

          <Card className="relative border-0 shadow-xl bg-white overflow-hidden">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

          <CardHeader className="space-y-1 pt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-semibold">Join Us</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-extrabold text-center">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create your account
              </span>
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg bg-green-50 border border-green-200 p-6 text-center space-y-4"
              >
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-900">
                    Account created successfully!
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                    <Mail className="h-4 w-4" />
                    <p>
                      Verification email sent to <strong>{email}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-green-600 mt-4">
                    Redirecting to login page...
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 border border-red-200 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold"
                  onClick={() => {
                    // TODO: Implement Google OAuth
                    setError('Google sign-in will be available soon');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Chrome className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Continue with Google</span>
                  </div>
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-700 font-semibold">Or continue with email</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-600 font-medium">
                    We&apos;ll send a verification email to this address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-12"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 1 ? passwordStrength.color : 'bg-gray-300'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 2 ? passwordStrength.color : 'bg-gray-300'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 3 ? passwordStrength.color : 'bg-gray-300'}`} />
                      </div>
                      <p className="text-xs text-gray-700 font-medium">
                        Password strength: <span className={passwordStrength.strength === 3 ? 'text-green-600 font-semibold' : passwordStrength.strength === 2 ? 'text-yellow-600 font-semibold' : 'text-red-600 font-semibold'}>{passwordStrength.label}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 font-medium">
                    Minimum 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-12"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-600 font-semibold">
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base"
                >
                  {loading ? (
                    <div className="flex items-center gap-2 text-white">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <span className="text-white">Create account</span>
                  )}
                </Button>

                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-700 font-medium">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline underline-offset-2"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-xs text-gray-700 font-medium">
                    By signing up, you agree to our Terms of Service
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-700 hover:text-purple-600 font-semibold transition-colors inline-flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
