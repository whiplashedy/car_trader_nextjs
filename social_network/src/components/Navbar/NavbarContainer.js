import {connect} from "react-redux";
import Navbar from "./Navbar";
import {logoutThunk} from "../../redux/auth-reducer";

const mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
})

export default connect(mapStateToProps, {logoutThunk})(Navbar);
