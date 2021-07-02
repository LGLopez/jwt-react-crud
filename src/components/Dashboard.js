import React, { Fragment } from 'react'

const Dashboard = ({ setAuth }) => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <button className="btn btn-secondary" onClick={() => setAuth(false)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard
