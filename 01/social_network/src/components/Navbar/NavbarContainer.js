import {connect} from "react-redux";
import Navbar from "./Navbar";

const mapStateToProps = (state) =>({
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
})

export default connect(mapStateToProps, {})(Navbar);
