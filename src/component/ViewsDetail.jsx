import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const ViewsDetail = () => {
    const {id} = useParams();
    const [tour, setTour] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3000/tours/${id}`)
            .then((response) => {
                setTour(response.data)
            })
            .catch(() => {
                alert("tour detail not found")
            })
    }, [])
    return (
        <div>
            <ul key={tour?.id}>
                <li><h3>{tour?.title}</h3></li>
                <li>{tour?.price}</li>
                <li>{tour?.description}</li>
            </ul>
        </div>
    );
};

export default ViewsDetail;