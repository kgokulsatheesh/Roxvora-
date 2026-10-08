import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../../../components/auth/AuthLayout';
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    // Replace with the reset-password API call once the backend is available.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    toast.success('Password updated. Please sign in.');
    navigate('/login', { replace: true });
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <ResetPasswordForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        onBackToLogin={() => navigate('/login')}
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;