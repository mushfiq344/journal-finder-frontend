import React from "react";
import { Movie } from "./movie";
import { LayoutContext } from "../../../components/layout/layout"


const SingleMovieIndex = (props) => {
    const { match: { params } } = props;
    return (

        <div>
            <LayoutContext.Consumer>
                {data => {
                    console.log('data at single movie index', data)
                    return (
                        <Movie slug_name={params.slug_name} data={data}></Movie>
                    )
                }}
            </LayoutContext.Consumer>
        </div>
    )
}

export { SingleMovieIndex }