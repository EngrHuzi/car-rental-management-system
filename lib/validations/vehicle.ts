import { z } from 'zod';

export const createVehicleSchema = z.object({
  model: z
    .string()
    .min(1, 'Model is required')
    .max(100, 'Model must be less than 100 characters'),
  brand: z
    .string()
    .min(1, 'Brand is required')
    .max(100, 'Brand must be less than 100 characters'),
  dailyPrice: z
    .number()
    .positive('Daily price must be positive')
    .min(0.01, 'Daily price must be at least $0.01'),
});

export const updateVehicleSchema = z.object({
  model: z
    .string()
    .min(1, 'Model is required')
    .max(100, 'Model must be less than 100 characters')
    .optional(),
  brand: z
    .string()
    .min(1, 'Brand is required')
    .max(100, 'Brand must be less than 100 characters')
    .optional(),
  dailyPrice: z
    .number()
    .positive('Daily price must be positive')
    .min(0.01, 'Daily price must be at least $0.01')
    .optional(),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
