import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Import useNavigate instead of useHistory
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import axios from "axios";

import "./AddEdit.css";


const initialState = {
    name: "",
    email: "",
    contact: ""
};


const AddEdit = () => {

    const [ state, setState ] = useState(initialState);

    const { name, email, contact } = state;

    const { id } = useParams();

    // Use useNavigate instead of useHistory
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
           .then((response) => {
                setState({...response.data[0]});
           });
    }, [id]);


    // function for handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if every input field is filled
        if(!name || !email || !contact) {
            toast.error("Please provide value into each input field");
        } else {

            if(!id) {
                axios.post("http://localhost:5000/api/post", 
                    {
                        name, 
                        email, 
                        contact
                    }
                ).then(() => {
                    setState({name: "", email: "", contact: ""});
                }).catch((err) => {
                    toast.error(err.response.data);
                });

                toast.success("Contact Added Successfully!");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, 
                    {
                        name, 
                        email, 
                        contact
                    }
                ).then(() => {
                    setState({name: "", email: "", contact: ""});
                }).catch((err) => {
                    toast.error(err.response.data);
                });

                toast.success("Contact Updated Successfully!");
            }

            setTimeout(() => {
                // Use navigate instead of history.push
                navigate('/');
            }, 500);
        }

    };


    // function for handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({...state, [name]: value});
    };


    return (
        <div style={{ marginTop: "100px" }}>

            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name ..."
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email ..."
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="contact">Contact</label>
                <input
                    id="contact"
                    name="contact"
                    type="number"
                    placeholder="Your Contact No. ..."
                    value={contact || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>

        </div>
    );

}


export default AddEdit;

