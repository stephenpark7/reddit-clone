// import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}