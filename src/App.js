import React from "react";
import Movies from "./components/movies.jsx";
import Navbar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/cusotmers";
import Rentals from "./components/rentals";
import Notfound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

import "./App.css";

function App() {
  return (
    <main className="container">
      <div>
        <Navbar className="col"></Navbar>
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={Notfound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
