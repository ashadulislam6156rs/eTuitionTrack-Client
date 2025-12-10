import React from 'react';
import Banner from '../Componants/Banner/Banner';
import HowItWorks from '../Componants/HowItWorks';
import WhyChooseUs from '../Componants/WhyChooseUs';
import LatestTuitions from '../Componants/LatestTuitions';

const Home = () => {
    return (
      <div className="pt-17">
        <Banner></Banner>
        <LatestTuitions
        ></LatestTuitions>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
      </div>
    );
};

export default Home;