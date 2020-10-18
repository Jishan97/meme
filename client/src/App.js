import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch}
from 'react-router-dom'
import Navbar from './components/layout/HeaderNavbar';
//Login component
import Login from './components/auth/Login'
//Home Page 
import Home from './components/auth/Home'
//Users 
import Users from './components/auth/users/Users'
//Memes
import AllMemes from './components/auth/memes/AllMemes'
//Admin control
import AdminControl from './components/auth/adminControl/AdminControl'


import UserItemProfile from './components/auth/users/UserItemProfile'



//AdminState
import AdminState from './context/AdminState'
//Admin dashboard state
import AdminDashboardState from './context/dashboard/AdminDashboardState'
//setAuthToken 
import setAuthToken from './utils/setAuthToken'
//PrivateRoutes
import PrivateRoute from './components/routing/PrivateRoutes'

//CSS 

// import './App.css'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  return (
    <AdminState>
      <AdminDashboardState>
       <Fragment>
    <Router>
    <Navbar/>
    <div className="container">
      <Switch>
      <PrivateRoute exact path='/' component={Home} />

        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path="/Users" component={Users}/>
        <PrivateRoute  exact path="/user/getSingleUser/:login" component={UserItemProfile}/>
        <PrivateRoute  exact path="/allMemes" component={AllMemes}/>
        <PrivateRoute  exact path="/adminControl" component={AdminControl}/>




      </Switch>
      </div>
    </Router>
    </Fragment>
    </AdminDashboardState>
    </AdminState>
  );
}

export default App;
  