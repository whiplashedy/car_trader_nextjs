import React from 'react'
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Recommendation from "./components/Recommendation/Recommendation";
import {BrowserRouter, Route} from "react-router-dom";
import LoginContainer from "./components/Navbar/Login/LoginContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import {connect} from "react-redux";
import {setInitializedThunk} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const FeedContentContainer = React.lazy(() => import('./components/Feed/FeedContent/FeedContentContainer'));
const ProfileDialogsContainer = React.lazy(() => import('./components/Dialogs/ProfileDialog/ProfileDialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const UserProfileContainer = React.lazy(() => import('./components/Users/UserProfile/UserProfileContainer'));


class App extends React.Component {
    componentDidMount() {
        this.props.setInitializedThunk();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <NavbarContainer/>
                    <Sidebar/>
                    <Route path="/feed" render={withSuspense(FeedContentContainer)}/>
                    <Route path="/messages" render={withSuspense(ProfileDialogsContainer)}/>
                    <Route path="/users" render={withSuspense(UsersContainer)}/>
                    <Route path="/profile/:uid" render={withSuspense(UserProfileContainer)}/>
                    <Route path="/login" render={() => <LoginContainer/>}/>
                    <Recommendation/>
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) =>({
    initialized: state.appPage.initialized
})

export default connect(mapStateToProps, {setInitializedThunk})(App);
