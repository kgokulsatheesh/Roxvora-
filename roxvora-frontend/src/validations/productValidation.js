import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().min(3, 'Product name must be at least 3 characters').required('Product name is required'),
  slug: yup.string().matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
  shortDescription: yup.string().max(500, 'Short description must be less than 500 characters'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  originalPrice: yup.number().positive('Original price must be positive'),
  category: yup.string().required('Category is required'),
  brand: yup.string(),
  sku: yup.string().min(3, 'SKU must be at least 3 characters').required('SKU is required'),
  stock: yup.number().integer().min(0, 'Stock cannot be negative').required('Stock quantity is required'),
  weight: yup.number().positive('Weight must be positive'),
  taxClass: yup.string().oneOf(['standard', 'reduced', 'zero']),
  isActive: yup.boolean(),
  isFeatured: yup.boolean(),
  isNew: yup.boolean(),
  isSale: yup.boolean(),
  tags: yup.string(),
});

export const variantSchema = yup.object({
  name: yup.string().min(2, 'Variant name must be at least 2 characters').required('Variant name is required'),
  sku: yup.string().min(3, 'SKU must be at least 3 characters').required('SKU is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  originalPrice: yup.number().positive('Original price must be positive'),
  stock: yup.number().integer().min(0, 'Stock cannot be negative').required('Stock quantity is required'),
  size: yup.string(),
  color: yup.string(),
  image: yup.string().url('Invalid image URL'),
  isActive: yup.boolean(),
});

export const categorySchema = yup.object({
  name: yup.string().min(2, 'Category name must be at least 2 characters').required('Category name is required'),
  slug: yup.string().matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: yup.string(),
  image: yup.string().url('Invalid image URL'),
  parentId: yup.string(),
  isActive: yup.boolean(),
  sortOrder: yup.number().integer().min(0),
});