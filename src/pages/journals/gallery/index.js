import React, { useState } from "react";
import JournalList from "./JournalList"
import { remoteServer } from "../../../variables";
import { LayoutContext } from "../../../components/layout/layout"
export default function Index() {

  const [url, setUrl] = useState(remoteServer + "movies");

  return (
    <LayoutContext.Consumer>
      {data => {
        return (

          // <JournalList data={data}></JournalList>
          <JournalList data={data}></JournalList>
        )
      }}
    </LayoutContext.Consumer>

  )

}
