import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../action/auth";
import { createMessage } from "../../action/messages";

const initialState = {
  username: "",
  email: "",
  password: "",
  password2: ""
};

const Register = ({ register, createMessage, isAuthenticated }) => {
  const [{ username, email, password, password2 }, setstate] = useState(
    initialState
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setstate((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const clearForm = () => {
    setstate({ ...initialState });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      createMessage({ passwordDonotMatch: "passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email
      };
      register(newUser);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={onChange}
              value={password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);
