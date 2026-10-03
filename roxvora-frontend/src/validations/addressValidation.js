import * as yup from 'yup';

export const addressSchema = yup.object({
  firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
  company: yup.string(),
  address1: yup.string().min(5, 'Address must be at least 5 characters').required('Address is required'),
  address2: yup.string(),
  city: yup.string().min(2, 'City must be at least 2 characters').required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  isDefault: yup.boolean(),
});