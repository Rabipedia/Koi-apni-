import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import riderData from '../../RiderData/RiderData';
import Rider from '../Rider/Rider';

const Home = () => {
    const [riders, setRiders] = useState([]);
    useEffect(()=> {
        setRiders(riderData);
    },[]);
    return (
        <div>
            {
                rider.map((rider) => {
                    <Rider rider={rider} ></Rider>
                })
            }
        </div>
    );
};

export default Home;