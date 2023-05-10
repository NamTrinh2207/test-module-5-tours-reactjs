import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";

const UpdateForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/tours/${id}`)
            .then((response) => {
                setTour(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const initialValues = {
        title: tour.title || '',
        price: tour.price || '',
        description: tour.description || '',
    };
    const validate = yup.object({
        title: yup.string()
            .max(20, "Must be 20 character or less")
            .required("required"),
        price: yup.number()
            .integer("Number can't include a decimal point")
            .required('required'),
        description: yup.string().required("required"),
    })
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values) => {
                    axios
                        .put(`http://localhost:3000/tours/${id}`, values)
                        .then(() => {
                            alert("Update success")
                            navigate('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <table>
                            <tbody>
                            <tr>
                                <td><label htmlFor={'title'}>Title : </label></td>
                                <td><Field name='title'></Field></td>
                                <td><ErrorMessage name={'title'}></ErrorMessage></td>
                            </tr>
                            <tr>
                                <td><label htmlFor={'price'}>Price : </label></td>
                                <td><Field name='price'></Field></td>
                                <td><ErrorMessage name={'price'}></ErrorMessage></td>
                            </tr>
                            <tr>
                                <td><label htmlFor={'description'}>Description : </label></td>
                                <td><textarea {...formik.getFieldProps("description")} /></td>
                                <td><ErrorMessage name={'description'}></ErrorMessage></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button>Update</button></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateForm;