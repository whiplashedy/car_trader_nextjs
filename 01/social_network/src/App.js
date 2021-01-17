import React from 'react'
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Recommendation from "./components/Recommendation/Recommendation";
import {BrowserRouter, Route} from "react-router-dom";
import ProfileDialogsContainer from "./components/Dialogs/ProfileDialog/ProfileDialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import FeedContentContainer from "./components/Feed/FeedContent/FeedContentContainer";
import UserProfileContainer from "./components/Users/UserProfile/UserProfileContainer";
import LoginContainer from "./components/Navbar/Login/LoginContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";

const App = (props) => {
    return (
       <BrowserRouter>
        <div className="App">
            <NavbarContainer/>
            <Sidebar/>
            <Route path ="/feed" render = {() => <FeedContentContainer/>}/>
            <Route path ="/messages" render = {() => <ProfileDialogsContainer/>}/>
            <Route path ="/users" render = {() => <UsersContainer/>}/>
            <Route path ="/profile/:uid" render = {() => <UserProfileContainer/>}/>
            <Route path ="/login" render = {() => <LoginContainer/>}/>
            <Recommendation/>
        </div>
       </BrowserRouter>
    );
}


export default App;
