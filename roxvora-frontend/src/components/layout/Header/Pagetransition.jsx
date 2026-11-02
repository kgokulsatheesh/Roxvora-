import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';

const pageIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * Wrap your <Routes> with this component.
 * - Scrolls to the top on every route change
 * - Fades the new page in smoothly (disabled for reduced-motion users)
 */
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <Box
      key={pathname}
      sx={{
        animation: `${pageIn} 320ms cubic-bezier(0.2, 0.7, 0.2, 1) both`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      {children}
    </Box>
  );
};

export default PageTransition;