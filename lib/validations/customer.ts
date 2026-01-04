import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be less than 200 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .max(20, 'Phone must be less than 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone format'),
});

export const updateCustomerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(200, 'Name must be less than 200 characters')
    .optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format')
    .optional(),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .max(20, 'Phone must be less than 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone format')
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
