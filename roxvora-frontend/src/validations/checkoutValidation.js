import * as yup from 'yup';

export const customerInfoSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  newsletter: yup.boolean(),
});

export const shippingInfoSchema = yup.object({
  shippingMethod: yup.string().required('Please select a shipping method'),
  addressId: yup.string().when('useNewAddress', { is: true, then: yup.string().notRequired() }),
  useNewAddress: yup.boolean(),
});

export const paymentInfoSchema = yup.object({
  paymentMethod: yup.string().required('Please select a payment method'),
  cardNumber: yup.string().when('paymentMethod', { is: 'card', then: yup.string().matches(/^\d{13,19}$/, 'Invalid card number').required('Card number is required') }),
  expiryDate: yup.string().when('paymentMethod', { is: 'card', then: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)').required('Expiry date is required') }),
  cvv: yup.string().when('paymentMethod', { is: 'card', then: yup.string().matches(/^\d{3,4}$/, 'Invalid CVV').required('CVV is required') }),
  cardName: yup.string().when('paymentMethod', { is: 'card', then: yup.string().min(2, 'Name on card is required').required('Name on card is required') }),
  billingAddressId: yup.string(),
  useShippingAddress: yup.boolean(),
});