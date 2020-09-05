import React, { Fragment, useState, useEffect } from "react";
import man from "../../assets/images/dashboard/user.png";
import { User, Mail, Lock, Settings, LogOut } from "react-feather";
//import app from "../../data/base";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';

import { remoteServer } from '../../../src/variables';
import { LayoutContext } from "../layout/layout"
const UserMenu = (props) => {
  const [profile, setProfile] = useState("");
  useEffect(() => {
    setProfile(localStorage.getItem("profileURL") || man);
  }, []);


  return (
    <Fragment>
      <LayoutContext.Consumer>
        {data => {
          console.log('data at top', data.user)
          return (
            <li className="onhover-dropdown">
              <div className="media align-items-center">
                <img
                  className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                  src={profile}
                  alt="header-user"
                />
                <div className="dotted-animation">
                  <span className="animate-circle"></span>
                  <span className="main-circle"></span>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                <li>
                  {data.username}
                </li>
                <li>
                  <a onClick={() => data.logOut()} href="#!">
                    <LogOut /> Log-out
            </a>
                </li>
              </ul>
            </li>
          )
        }}
      </LayoutContext.Consumer>
    </Fragment>
  );
};

export default withRouter(UserMenu);
