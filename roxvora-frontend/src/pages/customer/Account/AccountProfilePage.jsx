import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectUser, setUser } from '../../../store/slices/authSlice';
import ProfileForm from '../../../components/account/ProfileForm';

const AccountProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    newsletter: user?.newsletter ?? true,
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    // Replace with the profile API call once the backend is available.
    await new Promise((resolve) => setTimeout(resolve, 400));
    dispatch(setUser({ ...user, ...data }));
    setIsSubmitting(false);
    toast.success('Profile updated');
  };

  return (
    <section aria-labelledby="profile-heading">
      <h2 id="profile-heading" className="text-xl font-secondary font-bold text-primary mb-6">
        Profile Details
      </h2>

      <div className="card p-6">
        <ProfileForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
};

export default AccountProfilePage;
