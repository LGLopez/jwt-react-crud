import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({setAuth}) => {
    const [inputs, setInputs] = useState( { 
        email: '',
        password: '',
        name: ''
    })

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name] : e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const body = {email, password, name};

        try {
            const respone = await fetch('http://192.168.135.128:3001/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            const parseResponse = await respone.json();

            if(parseResponse.token){
                localStorage.setItem('token', parseResponse.token);
                setAuth(true);
                toast.success('Registered succesfully!')
            }
            else {
                toast.error(parseResponse);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <input type="text" name="name" placeholder="name" className="form-control my-3" value={name} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Already have an account? Go to login</Link>
        </Fragment>
    )
}

export default Register
