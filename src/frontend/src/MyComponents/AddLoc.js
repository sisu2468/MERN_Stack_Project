import React, { useState } from 'react'
import { Navbar } from './Navbar';

//   import * as React from "react";

export const AddLoc = () => {
    // const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        city: "",
        pin_code: "",
        landmark: "",
        state: ""
    })
    function refreshPage() {
        window.location.reload();
    }
    // to store value in local storage

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     localStorage.setItem("user", JSON.stringify(input))
    //     let url = 'http://localhost:8080/users/add'
    //     const params = new URLSearchParams()
    //     params.append('fname', input.fname)
    //     params.append('lname', input.lname)
    //     params.append('username', input.username)
    //     params.append('age', input.age)
    //     params.append('password', input.password)
    //     params.append('number', input.number)
    //     params.append('email', input.email)

    //     let option = {
    //         method: 'POST',
    //         url: url,
    //         headers: {

    //         },
    //         data: params
    //     }
    //     // console.log(data)

    //     try {
    //         // console.log(option)
    //         let response = await axios(option)
    //         // console.log(response)
    //         if (response.status === 200) {
    //             alert("User now registered, proceed to Login")
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 1500);
    //         }

    //     }
    //     catch (e) {
    //         alert("User NOT registered")

    //         // axios.post("http://localhost:8080/users/add",input )
    //         // .then(res=>console.log(res))
    //     }
    //     // navigate("/profile")
    // }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Create a new FormData object
        const formData = new FormData();

        // Append the input values to the formData object
        formData.append('locid', 0);
        formData.append('name', input.name);
        formData.append('city', input.city);
        formData.append('pin_code', input.pin_code);
        formData.append('landmark', input.landmark);
        formData.append('state', input.state);
        formData.append('country', "India");

        // Make the POST request to the API
        fetch('http://localhost/api/maps/new-location', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                // Extract the response data
                return response.json();
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        }).then(responseData => {
            // Access the access token, token type, and role from the response data
            const access_token = responseData.access_token;
            const token_type = responseData.token_type;
            const role = responseData.role;
            // Do whatever you want with the access token, token type, and role
            // console.log(`Access Token: ${access_token}`);
            // console.log(`Token Type: ${token_type}`);
            // console.log(`Role: ${role}`);
            // localStorage.setItem("loggedin", true)
            // nav("/profile")
        }).catch(error => {
            // Handle the error response
            console.error(error);
        });
    };

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="card mt-4">

                <div className="card-body">
                    <h5 className="card-title my-3">Add new Location</h5>
                    <form method='post'>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="State" aria-label="First name" required name="fname" value={input.state} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="mb-3 my-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                            <input type="email" placeholder="City" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="email" value={input.city} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="exampleInputEmail2">Pincode</label>
                                <input type="number" required className="form-control" placeholder="Pincode" aria-label="Age" name="age" value={input.pin_code} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleInputEmail1">Landmark</label>
                                <input type="text" required className="form-control" placeholder="Landmark" aria-label="Mobile No." name="number" value={input.landmark} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail3">Name of Place</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail3"
                                aria-describedby="emailHelp"
                                placeholder="Place"
                                required
                                name="username"
                                value={input.name}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-success mx-1" onClick={handleSubmit} >
                                Add
                            </button>
                            {/* <button type="submit" className="btn btn-primary mx-1">
                                    Already our member?
                                </button> */}
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </>

    )
}