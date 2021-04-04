import React from 'react';
import { useHistory } from 'react-router';

const Rider = (props) => {
    const {name, image, id} = props.rider;
    let history = useHistory()
    const handleRideClick = rideId => {
        const url = `/ride/${rideId};`
        history.push(url);
    }
    return (
        <div onClick={()=>handleRideClick(id)}>
            <img src={image} alt=""/>
            <h5>{name}</h5>
        </div>
    );
};

export default Rider;