import React, { useState } from "react";
import MovieList from "./movieList";
import { remoteServer } from "../../../variables";
import { LayoutContext } from "../../../components/layout/layout"
export default function Index() {

  const [url, setUrl] = useState(remoteServer + "movies");

  return (
    <LayoutContext.Consumer>
      {data => {
        return (
          <MovieList data={data}></MovieList>
        )
      }}
    </LayoutContext.Consumer>

  )

}
