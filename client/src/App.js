import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer';
import Login from './pages/login';
import Register from './pages/register';
import Contacts from './pages/contacts';
import AddContact from './pages/add';
import EditContact from './pages/edit';

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
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
