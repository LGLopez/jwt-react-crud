import React, { Fragment } from 'react'

const Login = ( { setAuth } ) => {
    return (
        <Fragment>
            <h1>Login</h1>
            <button className="btn btn-secondary" onClick={() => setAuth(true)}>Authenticate</button>
        </Fragment>
    )
}

export default Login;