import React, { useContext, useEffect, useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidbaer/sidebar";
import { remoteServer } from '../../../src/variables';
import { Redirect } from "react-router";
import Cookies from 'js-cookie'
import axios from 'axios';
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
    let url = remoteServer + 'userFromJwt';
    let bearer = 'Bearer ' + window.localStorage.getItem("token");
    axios({
      method: 'post',     //put
      url: remoteServer + 'auth/userFromJwt',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
      },
    })
      .then(async function (response) {
        console.log("at layout", response)
        if (response.status === 200) {
          loggedIn()
          let siteData = {}
          siteData['user'] = response.data.user
          siteData['username'] = response.data.user.username
          siteData.token = window.localStorage.getItem("token")
          siteData.remoteServer = remoteServer;
          siteData.logOut = logOut
          setData(siteData)
        } else {
          setToken(false)
        }
      })
      .catch(function (error) {
        setToken(false)
      });


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
