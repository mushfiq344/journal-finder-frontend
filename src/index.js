import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AdminThemeRoutes from "./admin-theme/admin-theme-routes";
import Cookies from 'js-cookie'
import { getSession } from './pages/auth/session';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import FilmsRoutes from "./pages/films/routes";
//importing authentication pages
import Signup from "./pages/auth/signup";
import { LoginIndex } from "./pages/auth/loginIndex";
import { SignupIndex } from "./pages/auth/signupIndex";
function Root() {

  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Redirect to={"/films"} />
        </Route>

        <Route path="/signup">
          <SignupIndex></SignupIndex>
        </Route>
        <Route path="/login">

          <LoginIndex></LoginIndex>

        </Route>
        <Route path="/films">
          <FilmsRoutes></FilmsRoutes>
        </Route>
      </Switch>
    </Router>
  );
}
const fakeAuth = {
  isAuthenticated: getSession(),
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}



function isValidToken() {
  let cTs = Math.floor(Date.now() / 1000);
  return (localStorage.getItem("token") >= cTs);
}
ReactDOM.render(<Root />, document.getElementById("root"));
