import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignup extends Component {
  state = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  };

  componentDidMount(){
    apiHandler.getOne("/profile/settings").then((apiRes) => {
      console.log(apiRes.data)
    })
    // this.setState({
    //   firstName:a,
    //   lastName:"",
    //   email:"",
    //   password:"",
    // })
  }

  updateUser = () => {
    apiHandler.updateOne("/profile/settings", this.state).then((apiRes) => {
      console.log(apiRes.data)
      
    })
    .catch((error) => {
      console.log(error)
    })  
  }

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;

    if (this.props.action === "edit"){
      this.updateUser();
    } else {
      apiHandler
      .signup(this.state)
      .then((data) => {
        authContext.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  render() {
    
    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Hello
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
         
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Create account</h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value= {this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email"  onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section-bottom">
          <p>Already have an account? </p>
          <Link className="link" to="/signin">
            Log in
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(withUser(FormSignup));
