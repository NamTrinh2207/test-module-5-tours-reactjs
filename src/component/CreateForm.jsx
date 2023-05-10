import React from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";
import axios from "axios";
import "../App.css"

const CreateForm = () => {
    const navigate = useNavigate();
    const value = {
        title: "",
        price: "",
        description: "",
    }
    const validate = yup.object({
        title: yup.string()
            .max(20, "Must be 20 character or less")
            .required("required"),
        price: yup.number()
            .integer("Number can't include a decimal point")
            .required('required'),
        description: yup.string().required("required"),
    })
    return (
        <Formik
            initialValues={value}
            validationSchema={validate}
            onSubmit={(values) => {
                axios.post("http://localhost:3000/tours", values)
                    .then(() => {
                        alert("create success")
                        navigate("/")
                    })
                    .catch(function (error) {
                        alert(error.getMessage)
                    })
            }}>
            {formik => (
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
                            <td><button>Create</button></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </Formik>
    );
};

export default CreateForm;