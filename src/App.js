import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies.jsx";
import Navbar from "./components/navbar";
import Customers from "./components/cusotmers";
import Rentals from "./components/rentals";
import Notfound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute.jsx";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.state.user;
    return (
      <main className="container">
        <div>
          <ToastContainer></ToastContainer>
          <Navbar user={this.state.user} className="col"></Navbar>
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>

            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/not-found" component={Notfound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
