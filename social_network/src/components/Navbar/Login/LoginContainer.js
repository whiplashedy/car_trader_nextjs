import React from 'react'
import {loginThunk, setAuthThunk} from "../../../redux/auth-reducer";
import {connect} from "react-redux";
import Login from "./Login";

class LoginContainer extends React.Component {

    render() {
        return <Login {...this.props} login = {this.props.loginThunk}/>
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth,
    login: state.authPage.login,
    errorMessage: state.authPage.errorMessage
})

export default connect(mapStateToProps, {setAuthThunk,loginThunk})(LoginContainer);

