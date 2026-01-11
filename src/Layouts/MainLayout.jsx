import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Componants/Navbar/Navbar';
import Footer from '../Componants/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import Loading from '../Componants/Loading/Loading';


const MainLayout = () => {
   const navigatation = useNavigation();
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-[#fdf7e4] dark:bg-gray-900 fixed top-0 z-100 text-gray-600 shadow-2xl w-full mx-auto">
          <Navbar></Navbar>
        </header>
        <main className="w-full mx-auto flex-1">
          {navigatation?.state == "loading" ? (
            <Loading></Loading>
          ) : (
            <Outlet></Outlet>
          )}
        </main>
        <footer className="w-full mx-auto bg-[#fdf7e4] dark:bg-gray-900">
          <Footer></Footer>
        </footer>
        <ToastContainer />
      </div>
    );
};

export default MainLayout;