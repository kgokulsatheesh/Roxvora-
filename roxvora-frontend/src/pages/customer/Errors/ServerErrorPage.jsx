import { Link } from 'react-router-dom';
import { FiHome, FiRefreshCw } from 'react-icons/fi';


const ServerErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-error-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-secondary font-bold text-primary mb-4">Something Went Wrong</h1>
        <p className="text-secondary mb-8">We&apos;re experiencing technical difficulties. Please try again in a few moments.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            <FiRefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <Link to="/" className="btn btn-secondary">
            <FiHome className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;