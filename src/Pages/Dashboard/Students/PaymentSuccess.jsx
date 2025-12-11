import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {

    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    

    useEffect(() => {
      if (sessionId) {
          axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
              
      }
    }, [sessionId, axiosSecure]);
    

    return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;