import React, { useEffect, useState } from 'react';
import Layout from './Layout';

import Country from './components/country/Country';
import State from './components/state/State';
import City from './components/city/City';

import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/Location/actions';

const Location = () => {
    const [activeButton, setActiveButton] = useState('country');

    const dispatch = useDispatch();
    const {
        loader,
        countryCreated,
        countryUpdate,
        countryDelete,
        countryListData,

        stateListData,
        stateCreated,
        stateUpdate,
        stateDelete,

        cityListData,
        cityCreated,
        cityUpdate,
        cityDelete,
    } = useSelector((state) => state?.locationReducer);

    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        setCountryList(countryListData);
        setStateList(stateListData);
        setCityList(cityListData);
    }, [countryListData, stateListData, cityListData]);

    /**
     * When country data updates then fetch only country data
     */
    useEffect(() => {
        dispatch({
            type: actions.COUNTRY_LIST,
        });
    }, [countryCreated, countryDelete, countryUpdate]);

    /**
     * When state data updates then fetch both country data and state data
     */
    useEffect(() => {
        dispatch({
            type: actions.COUNTRY_LIST,
        });
        dispatch({
            type: actions.STATE_LIST,
        });
    }, [stateCreated, stateDelete, stateUpdate]);

    /**
     * When city data updates then fetch country, state and city data
     */
    useEffect(() => {
        dispatch({
            type: actions.COUNTRY_LIST,
        });
        dispatch({
            type: actions.STATE_LIST,
        });
        dispatch({
            type: actions.CITY_LIST,
        });
    }, [cityCreated, cityDelete, cityUpdate]);

    /**
     * Count the number of countries, states and cities
     */
    const counts = {
        countryCount: countryListData.length,
        stateCount: stateListData.length,
        cityCount: cityListData.length,
    };

    return (
        <Layout
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            counts={counts}
        >
            {activeButton === 'country' && (
                <Country listingData={countryList} loader={loader} />
            )}
            {activeButton === 'state' && (
                <State listingData={stateList} loader={loader} />
            )}
            {activeButton === 'city' && (
                <City listingData={cityList} loader={loader} />
            )}
        </Layout>
    );
};

export default Location;
