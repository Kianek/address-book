import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import Login from './components/login';
import Register from './components/register';
import Contacts from './components/contacts';
import AddContact from './components/add';
import EditContact from './components/edit';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Switch>
            <PrivateRoute path="/contacts" component={Contacts} />
            <PrivateRoute path="/add" component={AddContact} />
            <PrivateRoute path="/:id/edit" component={EditContact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
