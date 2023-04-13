import { useContext, useState } from "react";
import Page from "pages/Page";
import NewSubGreddiit from "components/NewSubGreddiit";
import React, { useEffect } from "react";
import "./styles.css";
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const MySubGreddiits = () => {

    const [block_no, setblock_no] = useState(["B1,B2"]) // fetch data from backend using params
    const [finalblock_no, setfinalblock_no] = useState() // stores the final block number
    const [car, setCar] = useState("")
    const history = useHistory(); // Replace useNavigate with useHistory
    console.log(car)
    return(
        <>
        <Page full header={"Slot Booking Portal"} loading={false} empty={false}><center>
        <div class="dropdown my-4">
                <button class="btn btn-outline-primary dropdown-toggle px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Block_no
                </button>
                <ul class="dropdown-menu">
                {
                    block_no?.length > 0 &&
                    block_no?.map(({ block_no = "", _id = "" }) => {
                        return (
                            <>
                             <li>
                                <a className="dropdown-item" onClick={ () => setfinalblock_no[{block_no}]}>{block_no}</a>
                            </li>
                            </>)
                                })
                    }
                </ul>
        </div>
        <div className="form-group my-3 mx-4 py-3">
                <label htmlFor="exampleInputEmail3">Car Model</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail3"
                    aria-describedby="emailHelp"
                    placeholder="Tata Nexon EV"
                    required
                    name="car"
                    value={car}
                    onChange={(e) => setCar(e.target.value)} // Update the state with the input value directly
                />
            </div>

        </center>
        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-primary mx-1" >
                                Book a Slot
                            </button>
                            {/* <button type="submit" className="btn btn-primary mx-1">
                                    Already our member?
                                </button> */}
                        </div>
        </Page>
        </>
    )
};


export default MySubGreddiits;
