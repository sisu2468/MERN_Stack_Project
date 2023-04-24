import React, { useState } from 'react'
import { json } from 'react-router-dom';
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
    const  {name, city, pin_code, landmark, state, country} = input;

    const onchanger = e => setInput({ ...input, [e.target.name]: e.target.value});
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
        <Navbar/>
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