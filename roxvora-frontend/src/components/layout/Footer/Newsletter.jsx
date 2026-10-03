import { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="text-center md:text-left">
      <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
      <p className="text-primary-400 text-sm mb-4">Subscribe for exclusive offers & updates</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto md:mx-0">
        <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
        <div className="relative flex-1">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" aria-hidden="true" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            disabled={status === 'loading' || status === 'success'}
            aria-describedby="newsletter-status"
          />
        </div>
        <button
          type="submit"
          className="btn btn-secondary btn-md whitespace-nowrap"
          disabled={status === 'loading' || status === 'success' || !email}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="loader loader-sm loader-white" aria-hidden="true" />
              <span className="visually-hidden">Subscribing...</span>
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscribed!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Subscribe
              <FiArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          )}
        </button>
      </form>
      <p id="newsletter-status" className="sr-only" aria-live="polite">
        {status === 'success' ? 'Successfully subscribed to newsletter' : ''}
      </p>
    </div>
  );
};

export default Newsletter;