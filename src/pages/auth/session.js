import React, { Component } from 'react';
import Cookies from 'js-cookie'
// get the session for authorization and authentication
import { remoteServer, localHost } from '../../variables';
import { Redirect } from 'react-router';
export const getSession = () => {
    const jwt = Cookies.get('__session')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            // what is window.atob ?
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log(error)
    }
    return session
}

// check status of the response
export const checkResponseStatus = (response) => {

    // these expressions are saved in jtwmiddleware.php
    if (response.token === false) {

        return false;
    } else {
        return true;
    }

}