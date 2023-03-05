import React, { useState } from 'react'
import { Navbar } from './Navbar';

//   import * as React from "react";

export const AddLoc = () => {
    // const navigate = useNavigate()
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        age: "",
        number: "",
        username: "",
        password: "",
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


    return (
        <>
        <Navbar/>
        <div className="container">
            <div className="card mt-4">

                <div className="card-body">
                    <h5 className="card-title my-3">Add new Location</h5>
                    <form method='post'>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="State" aria-label="First name" required name="fname" value={input.fname} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="mb-3 my-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                            <input type="email" placeholder="City" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="email" value={input.email} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="exampleInputEmail2">Pincode</label>
                                <input type="number" required className="form-control" placeholder="Pincode" aria-label="Age" name="age" value={input.age} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleInputEmail1">Landmark</label>
                                <input type="text" required className="form-control" placeholder="Landmark" aria-label="Mobile No." name="number" value={input.number} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
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
                                value={input.username}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-success mx-1" >
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