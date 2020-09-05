import React, { useState, useEffect } from "react";

import '../../../css/movie-server.css';

import { ShowMovies } from "./showMovies";

import { PaginationLinks } from "./paginationLinks";

export default function MovieList(props) {
    const [url, setUrl] = useState(props.data.remoteServer + "movies");
    const [token, setToken] = useState(true);
    // hooks for paginated data
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // hooks for paginations
    const [first_page_url, setFirst_page_url] = useState(null);
    const [last_page_url, setLast_page_url] = useState(null);

    const [prev_page_url, setPrev_page_url] = useState(null);
    const [next_page_url, setNext_page_url] = useState(null);

    const [current_page, setCurrent_page] = useState(null);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let bearer = 'Bearer ' + props.data.token;
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
                    console.log("result here:", result);
                    if (result.token === false) {
                        setToken(false)
                    }
                    else {
                        setIsLoaded(true);

                        setItems(result.data);
                        // set links for first page and last page
                        setFirst_page_url(result.first_page_url);
                        setLast_page_url(result.last_page_url);
                        // set links for prev page and next page
                        setPrev_page_url(result.prev_page_url);
                        setNext_page_url(result.next_page_url);
                        // set links for current page
                        setCurrent_page(result.current_page);
                    }


                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError("error:", error);
                }
            )
    }, [url])
    const updateUrl = (url) => {
        setUrl(url);
    };
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {


        return (

            token === true ?
                <div>

                    <ShowMovies items={items}></ShowMovies>
                    {/* pagination links */}
                    <PaginationLinks updateUrl={updateUrl}
                        first_page_url={first_page_url}
                        last_page_url={last_page_url}
                        prev_page_url={prev_page_url}
                        next_page_url={next_page_url}
                        current_page={current_page} ></PaginationLinks>

                </div > : props.data.logOut()



        );

    }

}
