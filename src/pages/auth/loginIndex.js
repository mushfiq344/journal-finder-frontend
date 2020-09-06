import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Login } from "./login";
import { remoteServer } from '../../variables';
import axios from 'axios';
function LoginIndex() {

    const [loginOk, setLoginOk] = useState(false)

    useEffect(() => {

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
                console.log("at login Index", response)
                if (response.status === 200) {
                    setLoginOk(true);
                } else {
                    setLoginOk(false)
                }
            })
            .catch(function (error) {
                setLoginOk(false);
            });
    }, []);

    const loginDone = () => {

        setLoginOk(true);
    }
    console.log("loginok", loginOk)
    return (loginOk === true ? <Redirect to="/journals"></Redirect> : <Login loginDone={loginDone}></Login>)
}

export { LoginIndex }