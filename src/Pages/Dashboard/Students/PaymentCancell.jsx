import React from 'react';
import { Link } from 'react-router';

const PaymentCancell = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center">
          Payment Cancelled please trye again!
        </h1>
        <Link to={"/dashboard/applied-tutors"} className="myBtn btn">
          Try Again
        </Link>
      </div>
    );
};

export default PaymentCancell;