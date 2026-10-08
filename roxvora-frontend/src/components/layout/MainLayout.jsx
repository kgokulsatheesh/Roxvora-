import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';
import PageTransition from '@components/common/PageTransition/PageTransition';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <ScrollToTop />
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;