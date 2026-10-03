export const validators = {
  required: (value) => (value ? undefined : 'This field is required'),
  email: (value) => (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : undefined),
  minLength: (min) => (value) => (value && value.length < min ? `Must be at least ${min} characters` : undefined),
  maxLength: (max) => (value) => (value && value.length > max ? `Must be no more than ${max} characters` : undefined),
  pattern: (regex, message) => (value) => (value && !regex.test(value) ? message : undefined),
  numeric: (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined),
  integer: (value) => (value && !Number.isInteger(Number(value)) ? 'Must be an integer' : undefined),
  positive: (value) => (value && Number(value) <= 0 ? 'Must be positive' : undefined),
  url: (value) => (value && !/^https?:\/\/.+/.test(value) ? 'Invalid URL' : undefined),
  phone: (value) => (value && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value) ? 'Invalid phone number' : undefined),
  zipCode: (value) => (value && !/^\d{5}(-\d{4})?$/.test(value) ? 'Invalid ZIP code' : undefined),
  creditCard: (value) => (value && !/^\d{13,19}$/.test(value.replace(/\s/g, '')) ? 'Invalid credit card number' : undefined),
  expiryDate: (value) => (value && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? 'Invalid expiry date (MM/YY)' : undefined),
  cvv: (value) => (value && !/^\d{3,4}$/.test(value) ? 'Invalid CVV' : undefined),
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);