import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../../store/slices/authSlice';
import AccountHeader from '../../../components/account/AccountHeader';
import AccountSidebar from '../../../components/account/AccountSidebar';

const AccountLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <AccountHeader user={user} onSignOut={handleSignOut} />

      {/* ── Page body ─────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          boxSizing: 'border-box',
        }}
      >
        {/*
          CSS Grid layout:
            Mobile  (< 768 px) : single column — sidebar on top, content below
            Tablet  (768-1023) : single column — sidebar scrolls horizontally as pill strip
            Desktop (≥ 1024px) : 220px sidebar | 1fr content
        */}
        <div className="account-body-grid">
          {/* LEFT — navigation sidebar */}
          <AccountSidebar />

          {/* RIGHT — page content */}
          <main
            id="account-content"
            style={{ minWidth: 0 }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      {/* ── Layout styles ──────────────────────────────────────── */}
      <style>{`
        /* Mobile-first: single column, sidebar above content */
        .account-body-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        /* Desktop (≥ 1024px): fixed 220px sidebar + flexible content column */
        @media (min-width: 1024px) {
          .account-body-grid {
            grid-template-columns: 220px 1fr;
            gap: 2rem;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
};

export default AccountLayout;
