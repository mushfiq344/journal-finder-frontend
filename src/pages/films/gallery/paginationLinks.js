import React, { useState, useEffect } from "react";

const PaginationLinks = (props) => {
    return (<div className="row ml-4 mt-4">
        <ul className="pagination">
            {props.first_page_url ? (
                <li className="page-item"><a className="page-link" onClick={() => { props.updateUrl(props.first_page_url) }} href="#">First Page</a></li>
            ) : (
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">First Page</a>
                    </li>
                )}
            {props.prev_page_url ? (
                <li className="page-item"><a className="page-link" href="#" onClick={() => { props.updateUrl(props.prev_page_url) }}><i className="fa fa-angle-double-left"></i></a></li>
            ) : (

                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1"><i className="fa fa-angle-double-left"></i></a>
                    </li>

                )}
            <li className="page-item active">
                <a className="page-link" href="#">{props.current_page} <span className="sr-only">(current)</span></a>
            </li>
            {props.next_page_url ? (
                <li className="page-item"><a onClick={() => { props.updateUrl(props.next_page_url) }} className="page-link" href="#" ><i className="fa fa-angle-double-right"></i></a></li>
            ) : (

                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" href="#"><i className="fa fa-angle-double-right"></i></a>
                    </li>

                )}
            {props.last_page_url ? (
                <li className="page-item"><a className="page-link" href="#" onClick={() => { props.updateUrl(props.last_page_url) }}>Last Page</a></li>
            ) : (
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">Last Page</a>
                    </li>
                )}


        </ul>
    </div>)
}

export { PaginationLinks }