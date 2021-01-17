import React from 'react'
import UserProfile from "./UserProfile";

import {setUserStatusThunk, setUsersProfileThunk, updateUserStatusThunk} from "../../../redux/users-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

class UserProfileContainer extends React.Component{
    componentDidMount() {
        let uid = this.props.match.params.uid;
        if(!uid){
            uid = 13819;
        }
        this.props.setUsersProfileThunk(uid);
        this.props.setUserStatusThunk(uid);
    }

    render() {
        return <UserProfile {...this.props} profile = {this.props.profile} isFetching = {this.props.isFetching} status = {this.props.status} updateStatus = {this.props.updateUserStatusThunk}/>;
    }
}

let mapStateToProps = (state) =>({
    profile: state.usersPage.profile,
    isFetching: state.usersPage.isFetching,
    status: state.usersPage.status
})
export default compose(WithAuthRedirect, withRouter, connect(mapStateToProps,{setUsersProfileThunk, setUserStatusThunk, updateUserStatusThunk}))(UserProfileContainer)
