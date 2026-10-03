import * as yup from 'yup';

export const couponSchema = yup.object({
  code: yup.string().min(3, 'Coupon code must be at least 3 characters').max(20, 'Coupon code must be less than 20 characters').uppercase().required('Coupon code is required'),
  type: yup.string().oneOf(['percentage', 'fixed']).required('Discount type is required'),
  value: yup.number().positive('Value must be positive').required('Discount value is required'),
  minOrderAmount: yup.number().min(0, 'Minimum order amount cannot be negative'),
  maxDiscount: yup.number().positive('Maximum discount must be positive'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().min(yup.ref('startDate'), 'End date must be after start date').required('End date is required'),
  usageLimit: yup.number().integer().min(1, 'Usage limit must be at least 1'),
  usageLimitPerUser: yup.number().integer().min(1, 'Usage limit per user must be at least 1'),
  applicableProducts: yup.array().of(yup.string()),
  applicableCategories: yup.array().of(yup.string()),
  excludedProducts: yup.array().of(yup.string()),
  excludedCategories: yup.array().of(yup.string()),
  isActive: yup.boolean(),
});