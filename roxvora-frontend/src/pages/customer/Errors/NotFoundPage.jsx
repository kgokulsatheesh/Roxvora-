import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';


const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-neutral-200 mb-4">404</div>
        <h1 className="text-3xl font-secondary font-bold text-primary mb-4">Page Not Found</h1>
        <p className="text-secondary mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
          doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <FiHome className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link to="/shop" className="btn btn-secondary">
            <FiSearch className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;