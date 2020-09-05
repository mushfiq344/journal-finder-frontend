import React, { Fragment, useState, useEffect } from 'react';
import logo from "../../assets/images/xplex.png";
import axios from 'axios';
import { remoteServer } from '../../variables';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom'


const Login = (props) => {

    const [email, setEmail] = useState("abir@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [token, setToken] = useState(false);

    useEffect(() => {
        setToken(false);
    });


    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('email', email)
        data.append('password', password)
        axios.post(`${remoteServer}login`, data, {
            headers: { "Content-Type": "multipart/form-data", ctype: 'multipart/form-data' }
        })
            .then(async function (response) {
                if (response.data.token) {
                    console.log(response.data)
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("user_id", response.data.id);
                    window.localStorage.setItem("name", response.data.name);
                    const cookies = new Cookies();

                    cookies.set('__session', response.data.token);
                    props.loginDone();


                }//
            })
            .catch(function (error) {
                alert(error);
            });
    }


    return (
        <Fragment>

            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- sign up page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-sm-12 p-0">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center"><img width="40%" src={logo} alt="" /></div>
                                        <div className="card mt-4 p-4">

                                            <h6 className="text-center">Enter your Name , Email and Password For Login</h6>
                                            <form onSubmit={handleSubmit} className="theme-form">
                                                <div className="form-group">
                                                    <label className="col-form-label">Email</label>
                                                    <input className="form-control" type="email" placeholder="JohnDeo@gmail.com" value={email} onChange={(e) => handleEmail(e)} required />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Password</label>
                                                    <input className="form-control" type="password" placeholder="**********" value={password} onChange={(e) => handlePassword(e)} required />
                                                </div>


                                                <div className="form-row">
                                                    <div className="col-sm-4">
                                                        <button className="btn btn-primary" type="submit">Login</button>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <div className="text-left mt-2 m-l-20">Don't have an account?   <Link to={`signup`}>Signup</Link></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- sign up page ends--> */}
                </div>
            </div>

        </Fragment>
    );

}



export { Login };