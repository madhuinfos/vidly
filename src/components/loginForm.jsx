import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "default", password: "" },
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
  };

  handleInput = ({ target: input }) => {
    const account = { ...this.state.account };
    const errors = { ...this.state.errors };

    account[input.name] = input.value;
    console.log(input.name, input.value);
    const error = this.validateProperty(input.name, input.value);
    errors[input.name] = error;
    this.setState({ account, errors });
  };

  validate() {
    const { username, password } = this.state.account;

    const errors = { ...this.state.errors };

    errors["username"] = username.trim() === "" ? "Username is required" : "";
    errors["password"] = password.trim() === "" ? "Password is required" : "";

    return errors;
  }

  validateProperty(name, value) {
    console.log(name, value);
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="UserName"
            value={this.state.account.username}
            onChange={this.handleInput}
            error={this.state.errors.username}
          ></Input>

          <Input
            name="password"
            label="Password"
            value={this.state.account.password}
            onChange={this.handleInput}
            error={this.state.errors.password}
          ></Input>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
