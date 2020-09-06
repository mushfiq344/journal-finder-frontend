import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Signup } from "./signup";
import { remoteServer } from '../../variables';
import axios from 'axios';
function SignupIndex() {

    const [loginOk, setLoginOk] = useState(false)

    useEffect(() => {


        let url = remoteServer + 'user';
        let bearer = 'Bearer ' + window.localStorage.getItem("token");


        axios({
            method: 'post',     //put
            url: remoteServer + 'auth/userFromJwt',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
        })
            .then(async function (response) {
                console.log("at signupIndex Index", response)
                if (response.status === 200) {
                    setLoginOk(true);
                } else {
                    setLoginOk(false)
                }
            })
            .catch(function (error) {
                console.log("error at signup index", error)
                setLoginOk(false);
            })
    }, []);

    const loginDone = () => {

        setLoginOk(true);
    }

    return (loginOk === true ? <Redirect to="/journals"></Redirect> : <Signup loginDone={loginDone} message={"hello"}></Signup>)
}

export { SignupIndex }