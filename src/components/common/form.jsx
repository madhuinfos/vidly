import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit(e);
  };

  handleInput = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    data[input.name] = input.value;
    const error = this.validateProperty(input.name, input.value);
    errors[input.name] = error;
    this.setState({ data, errors });
  };

  validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};

    if (error) {
      for (let item of error.details) errors[item.path[0]] = item.message;
      return errors;
    }

    return null;
  }

  validateProperty(name, value) {
    const nameObj = { [name]: value };
    const schemaObj = { [name]: this.schema[name] };

    const { error } = Joi.validate(nameObj, schemaObj);

    return error ? error.details[0].message : null;
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={this.state.data[name]}
        autoFocus={true}
        onChange={this.handleInput}
        error={this.state.errors[name]}
      ></Input>
    );
  }
}

export default Form;
