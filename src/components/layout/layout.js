import React, { useContext, useEffect, useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidbaer/sidebar";
import { remoteServer } from '../../../src/variables';
import { Redirect } from "react-router";
import Cookies from 'js-cookie'
export const LayoutContext = React.createContext()

export default function Layout({ children }, props) {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(true)
  let [data, setData] = useState({})
  let [loginDone, setLoginDone] = useState(false)

  const logOut = () => {
    console.log("removing session")
    Cookies.remove('__session')
    window.localStorage.removeItem("token")
    setToken(false)
  }
  const loggedIn = () => {
    setLoginDone(true)
  }
  useEffect(() => {
    let url = remoteServer + 'user';
    let bearer = 'Bearer ' + window.localStorage.getItem("token");
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(
        async (result) => {
          if (result.token === false) {
            setToken(false)
          } else {
            loggedIn()
            console.log("at layout", result.user)

            let siteData = {}
            siteData['user'] = result.user
            siteData['username'] = result.user.name
            siteData.token = window.localStorage.getItem("token")
            siteData.remoteServer = remoteServer;
            siteData.logOut = logOut
            setData(siteData)
          }



        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )


  }, []);


  console.log("token at layout", token)

  return (
    token === true ?
      <div>
        <LayoutContext.Provider value={data}>
          <div className="page-wrapper">
            <div className="page-body-wrapper">

              <Header signOff={children.props.signOff} />
              <Sidebar />
              {data.token &&
                <div className="page-body">{children}</div>
              }


            </div>
          </div>
        </LayoutContext.Provider>
      </div> : <Redirect to="/login"></Redirect>
  );
}
