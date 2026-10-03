import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '@store/slices/authSlice';
import AccountHeader from '@components/account/AccountHeader';
import AccountSidebar from '@components/account/AccountSidebar';

const AccountLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AccountHeader user={user} onSignOut={handleSignOut} />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 lg:gap-8 px-4 lg:px-8 py-8">
        <AccountSidebar className="lg:shrink-0" />
        <main className="flex-1 min-w-0 py-6 lg:py-0" id="account-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
