import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';

import { motion } from 'framer-motion';

const NewsletterSection = ({
  title = 'Join Our Newsletter',
  subtitle = 'Get 10% off your first order',
  description = 'Subscribe to receive updates, access to exclusive deals, and more.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  className = '',
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`} aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-900 px-6 py-14 md:px-16 md:py-20 text-center">
          <span
            className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 border border-secondary/40 rounded-full text-xs font-semibold uppercase tracking-widest text-secondary-200 mb-5">
                Newsletter
              </span>
              <h2
                id="newsletter-heading"
                className="text-3xl md:text-4xl font-secondary font-semibold text-white mb-4"
              >
                {title}
              </h2>
              <p className="text-secondary-200 text-lg mb-2">{subtitle}</p>
              {description && <p className="text-white/60 mb-8">{description}</p>}
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              noValidate
            >
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <div className="relative flex-1">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder={placeholder}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  disabled={status === 'loading' || status === 'success'}
                  aria-describedby="newsletter-error newsletter-status"
                  aria-invalid={status === 'error'}
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg whitespace-nowrap flex items-center gap-2"
                disabled={status === 'loading' || status === 'success' || !email}
              >
                {status === 'loading' ? (
                  <>
                    <span className="loader loader-sm loader-white" aria-hidden="true" />
                    <span className="visually-hidden">Subscribing...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <FiCheck className="w-5 h-5" aria-hidden="true" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    {buttonText}
                    <FiArrowRight className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </motion.form>

            {error && (
              <motion.p
                id="newsletter-error"
                className="text-error text-sm mt-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                {error}
              </motion.p>
            )}

            <motion.p
              id="newsletter-status"
              className="sr-only"
              aria-live="polite"
            >
              {status === 'success' ? 'Successfully subscribed to newsletter' : ''}
              {status === 'error' ? 'Failed to subscribe. Please try again.' : ''}
            </motion.p>

            <motion.p
              className="text-xs text-white/50 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              By subscribing, you agree to our{' '}
              <Link to="/privacy" className="underline hover:text-secondary-200">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms" className="underline hover:text-secondary-200">
                Terms of Service
              </Link>
              . You can unsubscribe at any time.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;