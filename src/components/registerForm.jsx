import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { addUser } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async (e) => {
    try {
      const user = { ...this.state.data };
      delete user.username;
      user.email = this.state.data.username;
      const resposne = await addUser(user);
      auth.loginWithJwt(resposne.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "UserName")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
