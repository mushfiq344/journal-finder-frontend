import React, { useState, Children, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Cookies from 'js-cookie'

import Index from "./gallery/index";
import { CreateJournalIndex } from './create/index';
import { SingleJournalIndex } from "./singleJournal/index";

export default function JournalsRoutes() {
    const [token, setToken] = useState(true);

    useEffect(() => {

    })
    const signOff = () => {
        console.log("sign off");
        Cookies.remove('__session')
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("name");
        setToken(false)
    }
    return (
        token === true ?
            <Layout>
                <RouteChildren signOff={signOff}></RouteChildren>
            </Layout> :
            <Redirect to="/login"></Redirect>
    );
}

const RouteChildren = () => {
    let { path, url } = useRouteMatch();
    return (<Switch>
        <Route exact path={path}>
            {/* categories */}
            <Index></Index>
        </Route>
        <Route exact path={`${path}/create`}>
            <CreateJournalIndex></CreateJournalIndex>
        </Route>
        <Route path={`${path}/:id`} component={SingleJournalIndex}>
        </Route>
    </Switch>)
}


