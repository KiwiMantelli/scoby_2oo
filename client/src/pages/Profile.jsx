import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import apiHandler from '.././api/apiHandler'

class Profile extends Component {

  state = {
    items: [],
  };

  deleteItem = (id) => {
    console.log(id)

    apiHandler.deleteOne("/api/items/" + id, this.state).then(() => {
      this.setState({
        items: this.state.items.filter((item) => item.id !== this.state.items[id] )
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }


  componentDidMount(){
    apiHandler.getItems("/api/items").then((apiRes) => {
      this.setState({
        items: apiRes
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  
  render() {
    const { authContext } = this.props;
    const { user } = authContext;

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form">
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                />
              </div>
              <button className="form__button">Add phone number</button>
            </form>
          </div>

          {/* Break whatever is belo  */}
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
              <p>You don't have any items :(</p>
            </div>
          </div>

          <div className="CardItem">
            <h3>Your items</h3>
            <div className="item">
              <div className="round-image">
                <img
                  src="https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100"
                  alt="item"
                />
              </div>
              {this.state.items.map((item, index) => (

                <div key= {index} className="description">

                <h2>{item.name}</h2>
                <h4>{item.quantity}</h4>
                <p>{item.description}</p>
                <div className="buttons">
                  <span>
                    <button onClick={() => this.deleteItem(item._id)} className="btn-secondary">Delete</button>
                  </span>
                  <span>
                  <Link to={`/item/${item._id}/edit`}>
                  <button className="btn-primary">Edit</button>
                  </Link>
                    
                  </span>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
