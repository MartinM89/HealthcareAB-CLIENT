import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => (
  <div className='layout-container'>
    <Header />
    <main className='layout__main-style'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
