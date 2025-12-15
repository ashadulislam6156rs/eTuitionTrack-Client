import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Componants/Loading/Loading';


const PrivateRoutes = ({ children }) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Loading></Loading>
    }
      if (!user && !user?.email) {
        return <Navigate to={"/login"} state={location.pathname}></Navigate>;
      }

    return children;
};

export default PrivateRoutes;