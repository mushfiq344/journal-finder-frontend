import React, { useState, useEffect } from "react";

import '../../../css/movie-server.css';
import { Redirect } from 'react-router-dom'
import { SingleJournalData } from './singleJournalData'
const Journal = (props) => {

    const [data, setData] = useState({});
    const [token, setToken] = useState(true);
    const [wrongSlug, SetWrongSlug] = useState(false)

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let url = props.data.remoteServer + 'journal/' + props.id;
        let bearer = 'Bearer ' + props.data.token
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result at journal :", result);
                    setData(result)

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // the slug is incorrect


                    SetWrongSlug(true)
                }
            )
    }, [])


    return (
        token === true ?
            <div>
                {wrongSlug === false ?
                    <div>
                        <SingleJournalData data={data}></SingleJournalData>

                    </div>
                    : <Redirect to="/journals"></Redirect>
                }


            </div>
            : <Redirect to="/login"></Redirect>
    )
}

export { Journal }