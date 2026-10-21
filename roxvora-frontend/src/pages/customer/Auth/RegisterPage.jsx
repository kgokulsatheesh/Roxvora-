import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setCredentials } from '@store/slices/authSlic';
import { setCredentials } from '../../../store/slices/authSlice';
import AuthLayout from '../../../components/auth/AuthLayout';
import RegisterForm from '../../../components/auth/RegisterForm';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    setIsLoading(true);
    // Replace with the register API call once the backend is available.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Never keep credentials in Redux state.
    dispatch(
      setCredentials({
        user: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
        },
        token: 'demo-token',
      })
    );
    setIsLoading(false);
    navigate('/account', { replace: true });
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