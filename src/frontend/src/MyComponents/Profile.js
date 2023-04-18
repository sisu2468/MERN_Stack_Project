import React from 'react';
import { Navbar } from './Navbar';
import "./profile.css";

export const Profile = () => {
    const [data, setData] = useState();
    useEffect(() => {
        // Make the GET request to the API
        fetch('http://localhost:80/api/admin/auth/account', {
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                // Extract the response data
                return response.json();
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        }).then(responseData => {
            setData(responseData);
        }).catch(error => {
            // Handle the error response
            console.error(error);
        });
    }, []);

    return (
        <>
            <Navbar />
            {(!data) ? null : (
                <div className="ulcontainer">
                    <div className="Userinfo">
                        <div className="category">
                            <h3 className="hu">Email address:</h3>
                            <h3 className="hd">{data.email}</h3>
                        </div>
                        <div className="category">
                            <h3 className="hu">User name:</h3>
                            <h3 className="hd">{data.uname}</h3>
                        </div>
                        <div className="category">
                            <h3 className="hu">First name:</h3>
                            <h3 className="hd">{data.full_name}</h3>
                            <div className="category">
                                <h3 className="hu">Contact:</h3>
                                <h3 className="hd">{data.contact}</h3>
                            </div>
                            <div className="category">
                                <h3 className="hu">Role:</h3>
                                <h3 className="hd">{data.role}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
