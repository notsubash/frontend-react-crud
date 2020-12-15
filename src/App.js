import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Link, Switch} from 'react-router-dom';

import AuthService from './services/auth.service';

import Login from "./components/Auth/login.component";
import Register from "./components/Auth/register.component";
import Home from "./components/home.component";
import Profile from "./components/Auth/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import AddTutorial from './components/add-tutorial.component';
import TutorialsList from './components/tutorials-list.component';
import Tutorial from './components/tutorial.component';



class App extends Component{
  
  constructor(props){
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    }
  }
  

  componentDidMount(){
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut(){
    AuthService.logout();
    this.setState({
      currentUser: undefined
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Subash
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          </div>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            
            { currentUser ? (
              <div className="navbar-nav ml-auto">
                
              <li className="nav-iten">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>

              <li className="nav-iten">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
              
                <li className="nav-item">
                  <Link to = {"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to = {"/"} className="nav-link" onClick= {this.logOut} >
                    Log Out
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to = {"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to = {"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>

            )}
          </nav>      

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route exact path={["/","/tutorials"]} component={TutorialsList} />
              <Route exact path="/add" component={AddTutorial} />
              <Route exact path="/tutorials/:id" component={Tutorial} />
            </Switch>
          </div>
      </div>
    )
  }
}


export default App;
