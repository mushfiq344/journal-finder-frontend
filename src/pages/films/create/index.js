import React from "react";

import { LayoutContext } from "../../../components/layout/layout"
import { Create } from "./create";

const CreateMovieIndex = (props) => {

    return (

        <div>
            <LayoutContext.Consumer>
                {data => {
                    console.log('data at create movie index', data)
                    return (
                        <Create data={data}></Create>
                    )
                }}
            </LayoutContext.Consumer>
        </div>
    )
}

export { CreateMovieIndex }