import React, { useState, useEffect } from "react";

import { Redirect } from 'react-router-dom'
import axios from 'axios';

const SingleMovieComments = (props) => {


    const [comments, setComments] = useState([]);
    const [token, setToken] = useState(true);
    const [newComment, setNewComment] = useState(false);
    const [comment, setComment] = useState("");


    const postComment = () => {
        setNewComment(false)
        let bearer = 'Bearer ' + props.data.token;

        console.log("comment", comment);
        const data = new FormData();
        data.append('comment', comment)
        data.append('slug_name', props.slug_name)
        data.append('user_id', props.data.user.id)
        data.append('name', props.data.user.name)
        axios.post(props.data.remoteServer + 'insertComment', data, {
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response)
                if (response.token !== false && response.data.token !== false) {
                    setComment("");
                    setNewComment(true);
                }
                else {
                    setToken(false)
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let url = props.data.remoteServer + 'comments/' + props.slug_name;
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
                async (result) => {

                    if (result.token !== false) {
                        setComments(result.data)
                    }
                    else {
                        setToken(false)
                    }



                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )
    }, [newComment])


    return (
        token === true ?
            <div>
                <ul className="list-group">
                    {comments.map(item => (
                        <li key={item.id} className="list-group-item d-flex  align-items-center">
                            <span className="badge badge-primary badge-pill mr-4">{item.name} ::</span>  {item.comment}
                        </li>

                    ))}
                </ul>
                <div className="mb-4 mt-4">
                    <div className="row">
                        <div className="col-12">
                            <input className="form-control" value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="Add new comment" />
                        </div>

                        <div className="col-12 d-flex flex-row-reverse">
                            <button type="submit" className="btn btn-primary mr-1" onClick={() => postComment()}>Submit</button>
                        </div>

                    </div>


                </div>

            </div > : <Redirect to="/login" ></Redirect >
    )
}

export { SingleMovieComments }