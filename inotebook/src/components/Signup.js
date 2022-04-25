import React, { useState } from "react";
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
export default function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let history = useHistory();
    let myInput = document.getElementById("password");
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    // myInput.onFocus = function () {
    //     document.getElementById("message").style.display = "block";
    // }

    // When the user clicks outside of the password field, hide the message box
    // myInput.onblur = function () {
    //     document.getElementById("message").style.display = "none";
    // }
    // When the user starts to type something inside the password field
    const onBlur = () => {

        document.getElementById('password').style.display = "none";
        // $('#password').css('display', 'block');

    }
    myInput = () => {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }
        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
        //Validate length
        if (credentials.password.value.length < 8) {
            length.classList.remove("valid");
            length.classList.add("Invalid");
            props.showAlert('Please give a authentic password of 8 characters.')
        }
        else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth-token and redirect;
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("SignUp successfully.", "success")
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onFocus = () => {
        document.getElementById('password').style.display = "block";
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className="my-3">Create an account to use iNoteBook</h2>
            <form className="container mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" value={credentials.name} className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="We'll never share your email with anyone else." minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password" onBlur={onBlur} onFocus={onFocus} value={credentials.password} onChange={onChange} className="form-control" minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" onChange={onChange} className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div id="message">
                <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                <p id="number" className="invalid">A <b>number</b></p>
                <p id="length" className="invalid">Minimum <b>8 characters</b></p>
            </div>
        </div>
    )
}
