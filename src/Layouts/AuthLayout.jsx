import React from 'react';
import { Link, Outlet } from 'react-router';
import Container from '../Componants/Container/Container';
import logo from "../assets/eTuitionTrack-logo.png"
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
      <div className="pt-5 bg-base-200">
        <Container>
          <Link to={"/"} className="w-30 h-10">
            <img className="w-30 h-10" src={logo} alt="website logo" />
          </Link>
          <div>
            <Outlet></Outlet>
          </div>
        </Container>
        <ToastContainer />
      </div>
    );
};

export default AuthLayout;