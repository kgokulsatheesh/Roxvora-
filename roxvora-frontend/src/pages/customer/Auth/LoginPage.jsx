import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../components/auth/AuthLayout';
import LoginForm from '../../../components/auth/LoginForm';
import { useAuth } from '../../../hooks/useAuth';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (credentials) => {
    setIsLoading(true);
    try {
      await login(credentials);
      navigate('/account', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <LoginForm
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        onForgotPassword={() => navigate('/forgot-password')}
        onSwitchToRegister={() => navigate('/register')}
      />
    </AuthLayout>
  );
};

export default LoginPage;