import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from '../../api/apiHandler'

class ItemForm extends Component {
  state = {
    name:"",
    description:"",
    image:"",
    category:"",
    quantity:"",
    location: {coordinates:[]},
    email:"",
    contact:""
  };

  componentDidMount(){
    apiHandler.getOne("/api/items/" + this.props.id)
    .then((apiRes) => {
      console.log(apiRes)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  updateItems = () => {
    apiHandler.updateOne("/api/items/" + this.props.id, this.state)
    .then(() => {
        this.props.history.push("/profile")
      })
    .catch((error) => {
        console.log(error)
    })
  }

  createItems = () => {
    const fd = new FormData();
    
    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }
    
    apiHandler.createItem(fd).then(() => {
      this.props.history.push("/profile")
    }).catch((error) => {
      console.log(error);
    })
  }
  
  handleChange = (event) => {
    const name = event.target.name
    const value =
    event.target.type === "checkbox"
    ? event.target.checked
    : event.target.type === "file"
    ? event.target.files[0]
    : event.target.value;
    
    this.setState({
      [name]:value,
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.action === "edit"){
      this.updateItems();
    } else {
      this.createItems();
    }
    
    
    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )
    
    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };
  
  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    
    // var someTest = {...this.state.location.coordinates}
    // someTest = place.geometry.coordinates
    // console.log(someTest);
    var copy = [...this.state.location.coordinates]
    
    
    this.setState({
      location: copy.push(place.geometry.coordinates),
      adress: place.place_name
    })
  };
  
  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">{this.props.action === "edit" ? "Edit": "Add" }</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              name = "name"
              placeholder="What are you giving away ?"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select name="category" id="category" defaultValue="-1" onChange={this.handleChange}>
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input name="quantity" className="input" id="quantity" type="number" onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete name="location" onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              name ="description"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input name="image" className="input" id="image" type="file" onChange={this.handleChange} />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input name="email" type="radio" onChange={this.handleChange}/>
              user email
            </div>
            <input name="contact" type="radio" onChange={this.handleChange}/>
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit"> {this.props.action === "edit" ? "Edit Item": "Add Item"}</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
