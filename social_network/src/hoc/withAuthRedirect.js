import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) =>({
    isAuth: state.authPage.isAuth
})

export const WithAuthRedirect = (Component) =>{
    class RedirectComponent extends React.Component{
        render(){
            return !this.props.isAuth ? <Redirect to ='/login'/> : <Component {...this.props} />
        }

    }
    let connectedWithAuthRedirect = connect(mapStateToProps)(RedirectComponent)

    return connectedWithAuthRedirect;
}


