import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth-token and redirect;
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Logged in successfully.", "success")
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (<div>
        <form className="container mt-3" onSubmit={handleSubmit}>
            <h2 className="my-3">Login to continue to iNoteBook</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="We'll never share your email with anyone else." />
            </div>
            <div className="mb-3">
                <label htmlFor="pasword" className="form-label">Password</label>
                <input type="password" value={credentials.password} onChange={onChange} name="password" className="form-control" id="pasword" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

