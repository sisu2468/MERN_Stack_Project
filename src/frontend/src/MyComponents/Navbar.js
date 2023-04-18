import React from 'react'
// import Profile from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const nav = useNavigate()

    return (
        <>
            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src="https://static.wixstatic.com/media/8f4dc3_f4330f89a1eb4569bd3a978b642a2850~mv2.png/v1/fill/w_432,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Text.png" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-4">
                                <a className="nav-link" aria-current="page" onClick={() => (nav('/profile'))}>Profile</a>
                            </li>
                            <li className="nav-item mx-2">
                                <a className="nav-link" onClick={() => (nav('/addLocation'))}>Add new location</a>
                            </li>
                            <li className="nav-item mx-4">
                                <a className="nav-link" onClick={() => (nav('/addRobot'))}>Add new Robot</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
