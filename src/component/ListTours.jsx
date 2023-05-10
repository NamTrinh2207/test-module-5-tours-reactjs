import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const ListTours = () => {
    const [tours, setTours] = useState([]);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/tours')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [check]);

    return (
        <div>
            <table border={1}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tours.map(tour => (
                    <tr key={tour.id}>
                        <td>{tour.title}</td>
                        <td>{tour.price}</td>
                        <td>{tour.description}</td>
                        <td>
                            <button onClick={() => deleteTour(tour.id)}>Delete</button>
                            <button><Link to={`/update/${tour.id}`}>Update</Link></button>
                            <button><Link to={`/views/${tour.id}`}>Views</Link></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    function deleteTour(id) {
        axios.delete(`http://localhost:3000/tours/${id}`)
            .then(() => {
                alert('successful delete');
                setCheck(!check);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export default ListTours;