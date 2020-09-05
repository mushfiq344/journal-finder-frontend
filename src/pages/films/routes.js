import React, { useState, Children, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, Redirect } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Cookies from 'js-cookie'
import { Create } from './create/create';
import Index from "./gallery/index";
import { CreateMovieIndex } from './create/index';
import { SingleMovieIndex } from "./singleMovie/index";

export default function FilmsRoutes() {
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
            <CreateMovieIndex></CreateMovieIndex>
        </Route>
        <Route path={`${path}/:slug_name`} component={SingleMovieIndex}>

        </Route>
    </Switch>)
}


