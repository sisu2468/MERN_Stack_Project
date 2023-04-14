import React, { useState } from 'react'
import { Navbar } from './Navbar';

export const AddRobot = () => {
    const [input, setInput] = useState({
        roboid: "",
        remarks: "",
        roskey: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        // Create a new FormData object
        const formData = new FormData();

        // Append the input values to the formData object
        formData.append('roboid', input.roboid);
        formData.append('remarks', input.remarks);
        formData.append('roskey', input.roskey);


        // Make the POST request to the API
        fetch('http://localhost:80/api/robots/new', {
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
            <Navbar />
            <div className="container">
                <div className="card mt-4">

                    <div className="card-body">
                        <h5 className="card-title my-3">Add new Robot</h5>
                        <form method='post'>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Robot Name" aria-label="Robot name" required name="fname" value={input.fname} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="mb-3 my-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Robot ID</label>
                                <input type="email" placeholder="ID" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="email" value={input.roboid} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail2">ROS Key</label>
                                    <input type="number" required className="form-control" aria-label="Age" name="age" value={input.roskey} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1">Remarks</label>
                                    <input type="text" required className="form-control" aria-label="Mobile No." name="number" value={input.remarks} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                                </div>
                            </div>
                            {/* <div className="form-group my-3">
                <label htmlFor="exampleInputEmail3">Name of Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail3"
                  aria-describedby="emailHelp"
                  placeholder="Place"
                  required
                  name="username"
                  value={input.username}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                />
              </div> */}
                            <div className="my-3 text-center">
                                <button type="submit" className="btn btn-success mx-1"  onClick={handleSubmit}>
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
