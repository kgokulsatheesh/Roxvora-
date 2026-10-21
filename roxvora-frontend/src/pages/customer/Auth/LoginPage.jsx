import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../store/slices/authSlice';
import AuthLayout from '../../../components/auth/AuthLayout';
import LoginForm from '../../../components/auth/LoginForm';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ email }) => {
    setIsLoading(true);
    // Replace with the login API call once the backend is available.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Never keep credentials in Redux state.
    dispatch(
      setCredentials({
        user: { email, firstName: 'Aditi', lastName: 'Sharma' },
        token: 'demo-token',
      })
    );
    setIsLoading(false);
    navigate('/account', { replace: true });
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