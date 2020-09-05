import React, { useState, useEffect } from "react";
import { SingleMovieComments } from "./singleMovieComments";
import '../../../css/movie-server.css';
import { Redirect } from 'react-router-dom'
import { SingleMovieData } from './singleMovieData'
const Movie = (props) => {

    const [data, setData] = useState({});
    const [token, setToken] = useState(true);
    const [wrongSlug, SetWrongSlug] = useState(false)

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let url = props.data.remoteServer + 'movie/' + props.slug_name;
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
                    console.log("resutl at movie :", result);
                    if (result.token !== false) {
                        setData(result);
                    } else {
                        setToken(false)
                    }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // the slug is incorrect
                    console.log("wrong slug", error);

                    SetWrongSlug(true)
                }
            )
    }, [])


    return (
        token === true ?
            <div>
                {wrongSlug === false ?
                    <div>
                        <SingleMovieData data={data}></SingleMovieData>
                        <SingleMovieComments slug_name={props.slug_name} data={props.data}></SingleMovieComments>
                    </div>
                    : <Redirect to="/films"></Redirect>
                }


            </div>
            : <Redirect to="/login"></Redirect>
    )
}

export { Movie }