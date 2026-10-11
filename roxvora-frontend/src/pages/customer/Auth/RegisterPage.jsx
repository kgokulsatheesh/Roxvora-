import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../components/auth/AuthLayout';
import RegisterForm from '../../../components/auth/RegisterForm';
import { useAuth } from '../../../hooks/useAuth';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      await register(formValues);
      navigate('/account', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join ROXVORA today">
      <RegisterForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        onSwitchToLogin={() => navigate('/login')}
      />
    </AuthLayout>
  );
};

export default RegisterPage;