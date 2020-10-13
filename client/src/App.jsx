import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Forms/FormItem";
import EditItem from "./pages/EditItems"
import EditUser from "./pages/EditUser"

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path = "/item/:id/edit" component={EditItem}/>
        <Route exact path="/item/create" component={FormItem} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path = "/profile/settings" component = {EditUser}/>
      </Switch>
    </div>
  );
}

export default App;
