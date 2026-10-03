import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" id="main-content" role="main">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;