import React from 'react';
import Banner from '../Componants/Banner/Banner';
import HowItWorks from '../Componants/HowItWorks';
import WhyChooseUs from '../Componants/WhyChooseUs';
import LatestTuitions from '../Componants/LatestTuitions';
import LatestTutors from '../Componants/LatestTutors';
import FAQ from '../Componants/FAQ';
import Testimonials from '../Componants/Testimonials';
import Statistics from '../Componants/Statistics';
import Highlights from '../Componants/Highlights';

const Home = () => {
    return (
      <div className="pt-17">
        <Banner></Banner>
        <LatestTuitions
        ></LatestTuitions>
        <LatestTutors></LatestTutors>
        <Highlights></Highlights>
        <Testimonials></Testimonials>
        <Statistics></Statistics>
        <HowItWorks></HowItWorks>
        <WhyChooseUs></WhyChooseUs>
        <FAQ></FAQ>
      </div>
    );
};

export default Home;