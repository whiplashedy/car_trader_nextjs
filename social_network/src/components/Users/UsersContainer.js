import React from 'react'
import {connect} from "react-redux";
import {followThunk, setCurrentPage,
    setUsersThunk,
    unfollowThunk
} from "../../redux/users-reducer";
import Users from "./Users";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class UsersApiContainer extends React.Component {
    componentDidMount() {
        this.props.setUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onCurrentPageChange = (page) => {
        this.props.setCurrentPage(page);
        this.props.setUsersThunk(page, this.props.pageSize);
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onCurrentPageChange={this.onCurrentPageChange}
                      users={this.props.users}
                      followThunk={this.props.followThunk}
                      unfollowThunk={this.props.unfollowThunk}
                      isFetching={this.props.isFetching}/>

    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default compose(connect(mapStateToProps, {
    followThunk,
    unfollowThunk,
    setCurrentPage,
    setUsersThunk
}),WithAuthRedirect)(UsersApiContainer)
