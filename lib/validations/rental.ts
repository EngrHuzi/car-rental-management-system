import { z } from 'zod';

// Accept both date (YYYY-MM-DD) and datetime formats
const dateStringSchema = z.string().refine(
  (val) => {
    // Accept YYYY-MM-DD or ISO datetime formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const datetimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    return dateRegex.test(val) || datetimeRegex.test(val);
  },
  {
    message: 'Invalid date format. Expected YYYY-MM-DD',
  }
);

export const createRentalSchema = z.object({
  vehicleId: z
    .string()
    .uuid('Invalid vehicle ID format'),
  customerId: z
    .string()
    .uuid('Invalid customer ID format'),
  startDate: dateStringSchema,
  endDate: dateStringSchema,
}).refine(
  (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return end > start;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

export const updateRentalSchema = z.object({
  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
  status: z
    .enum(['active', 'completed', 'canceled'])
    .optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    }
    return true;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

export type CreateRentalInput = z.infer<typeof createRentalSchema>;
export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;
