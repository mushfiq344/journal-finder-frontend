import React, { useState, useEffect } from "react";

const SingleMovieData = (props) => {

    let rating = [];

    const ratingStars = () => {
        for (let i = 0; i < props.data.rating; i++) {
            rating.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
        }
        return rating;
    };
    const genreList = () => {
        if (props.data.genres) {
            return props.data.genres.map(item => (
                <li key={item.id} className="list-group mr-2">
                    <span className="badge badge-primary badge-pill">{item.name}</span>
                </li>

            ))
        }
    }
    return (<div className="row mt-4">
        <div className="col-4"></div>
        <div className="col-2">
            <img src={props.data.photo} width="200px"></img>
        </div>
        <div className="col-4 float-left">
            <div className="card">
                <div className="card-body" height="100%">
                    <h5 className="card-title">{props.data.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {ratingStars()}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Genres:
                            </h6>
                    <ul className="pagination">
                        {genreList()}
                    </ul>
                    <h6 className="card-subtitle mt-2 mb-2 text-muted">
                        Story:
                            </h6>


                    <p className="card-text">{props.data.description}</p>

                </div>
            </div>
            <div className="col-4"></div>

        </div>
    </div>)
}

export { SingleMovieData }