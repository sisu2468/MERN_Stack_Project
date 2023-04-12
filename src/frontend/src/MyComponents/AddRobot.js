import React, { useState } from 'react'
import { Navbar } from './Navbar';

export const AddRobot = () => {
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        age: "",
        number: "",
        username: "",
        password: "",
    })
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
                                <input type="email" placeholder="ID" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="email" value={input.email} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail2">Area of Deployment</label>
                                    <input type="number" required className="form-control" aria-label="Age" name="age" value={input.age} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1">Remarks</label>
                                    <input type="text" required className="form-control" aria-label="Mobile No." name="number" value={input.number} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
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
