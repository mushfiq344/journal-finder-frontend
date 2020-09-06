import React from "react";
import { Journal } from "./Journal";
import { LayoutContext } from "../../../components/layout/layout"


const SingleJournalIndex = (props) => {
    const { match: { params } } = props;
    return (

        <div>
            <LayoutContext.Consumer>
                {data => {
                    console.log('data at single journal index', data)
                    return (
                        <Journal id={params.id} data={data}></Journal>

                    )
                }}
            </LayoutContext.Consumer>
        </div>
    )
}

export { SingleJournalIndex }