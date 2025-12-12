import React from 'react';
import Banner from '../Componants/Banner/Banner';
import HowItWorks from '../Componants/HowItWorks';
import WhyChooseUs from '../Componants/WhyChooseUs';
import LatestTuitions from '../Componants/LatestTuitions';
import LatestTutors from '../Componants/LatestTutors';

const Home = () => {
    return (
      <div className="pt-17">
        <Banner></Banner>
        <LatestTuitions
        ></LatestTuitions>
        <LatestTutors></LatestTutors>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
      </div>
    );
};

export default Home;