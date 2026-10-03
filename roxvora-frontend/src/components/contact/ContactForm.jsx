import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import Button from '@components/common/Button/Button';

const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

const ContactForm = ({
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onChange',
  });

  if (isSuccess) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-primary mb-2">Message Sent!</h2>
        <p className="text-secondary mb-6">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
        <Button variant="primary" onClick={() => reset()}>
          Send Another Message
        </Button>
      </div>
    );
  }

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'order', label: 'Order Support' },
    { value: 'return', label: 'Returns & Exchanges' },
    { value: 'shipping', label: 'Shipping Questions' },
    { value: 'product', label: 'Product Information' },
    { value: 'wholesale', label: 'Wholesale Inquiry' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('name')}
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          required
          autoComplete="name"
        />
        <Input
          {...register('email')}
          type="email"
          label="Email"
          placeholder="john@example.com"
          error={errors.email?.message}
          required
          autoComplete="email"
        />
      </div>

      <Select
        {...register('subject')}
        label="Subject"
        options={subjects}
        placeholder="Select a subject"
        error={errors.subject?.message}
        required
      />

      <label htmlFor="contact-message" className="block text-sm font-medium text-primary mb-1">
        Message
      </label>
      <textarea
        id="contact-message"
        {...register('message')}
        rows={6}
        className="input-field resize-y"
        placeholder="How can we help you?"
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? 'contact-message-error' : undefined}
        required
      />
      {errors.message && (
        <p id="contact-message-error" role="alert" className="text-error text-sm mt-1">
          {errors.message.message}
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;