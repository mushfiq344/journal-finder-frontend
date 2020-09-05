import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Signup } from "./signup";
import { remoteServer } from '../../variables';
function SignupIndex() {

    const [loginOk, setLoginOk] = useState(false)

    useEffect(() => {


        let url = remoteServer + 'user';
        let bearer = 'Bearer ' + window.localStorage.getItem("token");
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                async (result) => {
                    console.log('Signup Index', result)
                    if (result.token !== false) {
                        setLoginOk(true);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )


    }, []);

    const loginDone = () => {

        setLoginOk(true);
    }

    return (loginOk === true ? <Redirect to="/films"></Redirect> : <Signup loginDone={loginDone} message={"hello"}></Signup>)
}

export { SignupIndex }