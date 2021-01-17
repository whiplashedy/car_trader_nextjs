import React from 'react'
import axios from "axios";
import {setUserData} from "../../../redux/auth-reducer";
import {connect} from "react-redux";
import Login from "./Login";

class LoginContainer extends React.Component{
componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
        withCredentials: true
    }).then(response => {
        if(response.data.resultCode === 0) {
            this.props.setUserData(response.data.data);
        }
    });
}

render() {
    return <Login {...this.props}/>
}

}
const mapStateToProps = (state) =>({
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
})

export default connect(mapStateToProps, {setUserData})(LoginContainer);

