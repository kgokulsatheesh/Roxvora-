import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '@components/auth/AuthLayout';
import ForgotPasswordForm from '@components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async ({ email }) => {
    setIsLoading(true);
    // Replace with the password-reset API call once the backend is available.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    setSentTo(email);
    toast.success(`Reset instructions sent to ${email}`);
  };

  if (sentTo) {
    return (
      <AuthLayout title="Check your inbox" subtitle="We sent password reset instructions">
        <div className="text-center">
          <p className="text-secondary mb-6">
            If an account exists for <span className="font-medium text-primary">{sentTo}</span>, you
            will receive a link to reset your password shortly.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>
            Back to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="We'll send you reset instructions">
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        onBackToLogin={() => navigate('/login')}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;