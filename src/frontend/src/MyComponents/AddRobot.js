import React, { useState } from 'react'
import { Navbar } from './Navbar';

export const AddRobot = () => {
    const [reg, setreg] = useState({
        roboid: 0,
        remarks: "",
        roskey: ""
    });
    const { remarks, roskey } = reg;

    const onchanger = e => setreg({ ...reg, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bdy = JSON.stringify(reg);
        fetch('http://localhost:80/api/robots/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bdy,
        }).then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        }).then(responseData => {
            setreg({
                roboid: 0,
                remarks: "",
                roskey: ""
            });
        }).catch(error => {
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
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="exampleInputEmail2">ROS Key</label>
                                    <input type="text" required className="form-control" aria-label="Age" name="roskey" value={roskey} onChange={e => onchanger(e)} />
                                </div>
                                <div className="col">
                                    <label htmlFor="exampleInputEmail1">Remarks</label>
                                    <input type="text" required className="form-control" aria-label="Mobile No." name="remarks" value={remarks} onChange={e => onchanger(e)} />
                                </div>
                            </div>
                            <div className="my-3 text-center">
                                <button type="submit" className="btn btn-success mx-1" onClick={handleSubmit}>
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
