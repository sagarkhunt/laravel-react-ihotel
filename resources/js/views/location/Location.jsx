import React, { useState } from 'react';
import Layout from './Layout';
import Country from './components/country/Country';
import State from './components/state/State';
import City from './components/city/City';

const Location = () => {
    const [activeButton, setActiveButton] = useState('country');

    return (
        <Layout activeButton={activeButton} setActiveButton={setActiveButton}>
            {activeButton === 'country' && <Country />}
            {activeButton === 'state' && <State />}
            {activeButton === 'city' && <City />}
        </Layout>
    );
};

export default Location;
