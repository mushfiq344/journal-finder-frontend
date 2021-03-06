import React, { Fragment } from 'react';
import logo from "../../assets/images/endless-logo.png";
import axios from 'axios';
import { remoteServer } from "../../variables";
import { Link } from 'react-router-dom'
class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", email: "", password: "", password_confirmation: "" };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword_confirmation = this.handlePassword_confirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    // field handles
    handleName(event) {

        this.setState({ name: event.target.value });
    }
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }


    handlePassword_confirmation(event) {
        this.setState({ password_confirmation: event.target.value });
    }




    handleSubmit(event, props) {
        event.preventDefault();

        console.log(this.state.name);
        const data = {};
        data['name'] = this.state.name
        data['username'] = this.state.email
        data['password'] = this.state.password
        data['confirm_password'] = this.state.confirm_password
        data['role'] = "ADMIN"

        axios({
            method: 'post',     //put
            url: remoteServer + 'user',
            data: data
        })
            .then(function (response) {
                console.log("at signup", response)

                if (response.status === 201) {
                    console.log(response.data)
                    window.localStorage.setItem("token", response.data);
                    props.loginDone()

                }
            })
            .catch(function (error) {

                alert(error);
            });

        this.setState({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''

        })


    }

    render() {
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
                                                <h4 className="text-center">NEW USER</h4>
                                                <h6 className="text-center">Enter your Name , Email and Password For Signup</h6>
                                                <form onSubmit={(event) => this.handleSubmit(event, this.props)} className="theme-form">
                                                    <div className="form-row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Name</label>
                                                                <input className="form-control" type="text" placeholder="John" value={this.state.name} onChange={this.handleName} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Email</label>
                                                        <input className="form-control" type="email" placeholder="JohnDeo@gmail.com" value={this.state.email} onChange={this.handleEmail} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" placeholder="**********" value={this.state.password} onChange={this.handlePassword} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Confirm Password</label>
                                                        <input className="form-control" type="password" placeholder="**********" value={this.state.password_confirmation} onChange={this.handlePassword_confirmation} required />
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-sm-4">
                                                            <button className="btn btn-primary" type="submit">Sign Up</button>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <div className="text-left mt-2 m-l-20">Are you already user?  <Link to={`login`}>Login</Link></div>
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
}



export { Signup };