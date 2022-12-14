import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import SimpleMap from '../GoogleMap/SimpleMap';
import passengerIcon from '../../images/peopleicon.png';
import riderData from '../../RiderData/RiderData';
import './Destination.css';


const Destination = () => {
    const { rideId} =useParams();
    console.log(rideId);
    const [destination, setDestination] = useState({
        pickFrom: '',
        pickTo: '',
        isReady: false
    })
    const {pickFrom, pickTo, isReady} = destination;
    const rideInfo = riderData.find(rider => rider.id === rideId);
    const {image, name, passenger, price} = rideInfo;
    
    const handleBlur = (event) => {
        const newDestination = {...destination};
        newDestination[event.target.name] = event.target.value;
        setDestination(newDestination);
    } 

    const handleSubmit = (event) => {
        const newDestination = {...destination};
        newDestination.isReady = true;
        setDestination(newDestination);
        event.preventDefault();
    }
    return (
        <div>
            <div className="rows">
                <div className="col-md-4 mt-5">
                    {pickFrom&&pickTo&&isReady?
                        <div>
                            <div className="destination-form ml-1 mb-2 bg-danger text-white p-3">
                                <ul>
                                    <li>
                                        <h3>{destination.pickFrom}</h3>
                                    </li>
                                    <li>
                                        <h3>{destination.pickTo}</h3>
                                    </li>
                                </ul>
                            </div>
                            <div className="ride-info mt-3 bg-light p-3">
                                <img width='55px' src={image} alt="" />
                                <h4>{name}</h4>
                                <div className="d-flex align-item-center">
                                    <img width="28px" height='28px' src={passengerIcon} alt="" />
                                    <h4>{passenger}</h4>
                                </div>
                                <h4>${price}</h4>
                            </div>
                            <div className="ride-info mt-3 bg-light p-3">
                                <img width='55px' src={image} alt="" />
                                <h4>{name}</h4>
                                <div className="d-flex align-item-center">
                                    <img width="28px" height='28px' src={passengerIcon} alt="" />
                                    <h4>{passenger}</h4>
                                </div>
                                <h4>${price}</h4>
                            </div>
                            <div className="ride-info mt-3 bg-light p-3">
                                <img width='55px' src={image} alt="" />
                                <h4>{name}</h4>
                                <div className="d-flex align-item-center">
                                    <img width="28px" height='28px' src={passengerIcon} alt="" />
                                    <h4>{passenger}</h4>
                                </div>
                                <h4>${price}</h4>
                            </div>
                        </div>
                        : <form onSubmit={handleSubmit} className="destination-form ml-1 mb-2 bg-light p-3" action="">
                            <label htmlFor="pickFrom"><strong>Pick From</strong></label>
                            <input onBlur={handleBlur} name="pickFrom" className="form-control mb-2" type="text" required placeholder="pick from" />
                            <label htmlFor="pickTo"><strong>Pick To</strong></label>
                            <input onBlur={handleBlur} name="pickTo" className="form-control mb-2" type="text" required placeholder="pick to" />
                            <label htmlFor="party"><strong>Choose Date</strong> </label>
                            <input type="date"  className="form-control mb-2" name="party" id=""/>
                            <input className="search-btn btn btn-danger mb-2 p-2" type="submit" value="search" />
                        </form>}
                </div>
                <div className="col-md-8 mt-5 pb-5">
                    <SimpleMap></SimpleMap>
                </div>
            </div>
            
        </div>
    );
};

export default Destination;