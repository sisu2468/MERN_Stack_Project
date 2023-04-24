import React, { useState } from 'react';
import { Navbar } from './Navbar';

//   import * as React from "react";

export const AddLoc = () => {
    // const navigate = useNavigate()
    const [input, setInput] = useState({
        locid: 0,
        name: "",
        city: "",
        pin_code: "",
        landmark: "",
        state: "",
        country: ""
    })

    const onchanger = e => setInput({ ...input, [e.target.name]: e.target.value });
    // function refreshPage() {
    //     window.location.reload();
    // }

    const handleSubmit = (event) => {
        event.preventDefault();

        const something = JSON.stringify(input)
        // Make the POST request to the API
        fetch('http://localhost/api/maps/new-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: something,
        }).then(response => {
            if (response.ok) {
                // Extract the response data
                console.log("ok")
                return response.json();
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        }).then(responseData => {
            setInput({
                locid: 0,
                name: "",
                city: "",
                pin_code: "",
                landmark: "",
                state: "",
                country: ""
            });
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
                        <h5 className="card-title my-3">Add new Location</h5>
                        <form method='post'>
                            <div className="mb-3 my-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                                <input type="text" placeholder="Country" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="country" value={input.country} onChange={e => onchanger(e)} />
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1">State</label>
                                    <input type="text" required className="form-control" placeholder="State" aria-label="Mobile No." name="state" value={input.state} onChange={e => onchanger(e)} />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail2">Pincode</label>
                                    <input type="number" required className="form-control" placeholder="Pincode" aria-label="pin_code" name="pin_code" value={input.pin_code} onChange={e => onchanger(e)} />
                                </div>

                            </div>
                            <div className="col">
                                <label htmlFor="exampleInputEmail2">City</label>
                                <input type="text" required className="form-control" placeholder="City" aria-label="city" name="city" value={input.city} onChange={e => onchanger(e)} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail3">Landmark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail3"
                                    aria-describedby="emailHelp"
                                    placeholder="Landmark"
                                    required
                                    name="landmark"
                                    value={input.landmark}
                                    onChange={e => onchanger(e)}
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail3">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail3"
                                    aria-describedby="emailHelp"
                                    placeholder="Name of Place"
                                    required
                                    name="name"
                                    value={input.name}
                                    onChange={e => onchanger(e)}
                                />
                            </div>
                            <div className="my-3 text-center">
                                <button type="submit" className="btn btn-success mx-1" onClick={handleSubmit} >
                                    Add
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}