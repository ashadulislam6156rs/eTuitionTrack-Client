import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Componants/Navbar/Navbar';
import Footer from '../Componants/Footer/Footer';


const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;