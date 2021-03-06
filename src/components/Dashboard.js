import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState('');

    const getName = async () => {
        try {
            const response = await fetch('http://192.168.135.128:3001/dashboard', {
                method: 'GET',
                headers: {token: localStorage.token}
            });
            
            const parseResponse = await response.json();
            
            setName(parseResponse.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        toast.success('Logged out succesfully!');
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard
