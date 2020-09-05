import React from "react";
import { Link } from 'react-router-dom'
const ShowMovies = (props) => {
    return (
        <div className="pagination row" >
            {props.items.map(item => (
                <div key={item.id} className={"ml-4 col-md-3 mt-4"}>
                    <div className="col-12" style={{ "textAlign": "center" }}>

                        <Link to={`/films/${item.slug_name}`}>
                            <img width="200px" src={item.photo}></img>
                        </Link>
                    </div>
                    <div className="col-12" style={{ "textAlign": "center" }}>
                        <Link to={`/films/${item.slug_name}`}>{item.name}</Link>

                    </div>
                </div>
            ))}
        </div>)
}

export { ShowMovies }