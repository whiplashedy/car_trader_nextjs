import React from 'react'
import UserProfile from "./UserProfile";
import axios from "axios";
import {setIsFetching, setUserProfile} from "../../../redux/users-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class UserProfileContainer extends React.Component{
    componentDidMount() {
        this.props.setIsFetching(true);
        let uid = this.props.match.params.uid;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + uid).then(response => {
            this.props.setIsFetching(false);
            this.props.setUserProfile(response.data);
        })
    }

    render() {
        return <UserProfile {...this.props} profile = {this.props.profile} isFetching ={this.props.isFetching}/>;
    }
}

let mapStateToProps = (state) =>({
    profile: state.usersPage.profile,
    isFetching: state.usersPage.isFetching
})

let UrlProfileComponent = withRouter(UserProfileContainer);

export default connect(mapStateToProps,{setUserProfile, setIsFetching})(UrlProfileComponent);
