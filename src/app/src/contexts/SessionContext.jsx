import { useState, useEffect, createContext } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
    const [session, setSession] = useState({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            // console.log(response);
            setSession(response);
        }).catch((error) => {
            console.log(error);
            setSession(null);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch('/api/auth/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        }).then(function (response) {
            // console.log(response);
            setData(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, setSession, data, setData, loading, setLoading }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
