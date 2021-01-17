import React from "react";
import classes from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <ul className="navbar-nav mr-auto">
                <li className= {`${classes.item} nav-item active`}>
                    <NavLink className="nav-link" to="/feed"> <i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className={`${classes.item}  nav-item active`}>
                    <NavLink className="nav-link" to="/users" ><i className="far fa-user-circle"></i> Friends<span className="sr-only">(current)</span></NavLink>
                </li>
                <li className={`${classes.item} nav-item active`}>
                    <NavLink className="nav-link" to="/messages"><i className="far fa-envelope"></i> Messages <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className={`${classes.item} nav-item active`}>
                    <NavLink className="nav-link" to="#"><i className="fas fa-headphones"></i> Music <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className={`${classes.item} nav-item active`}>
                    <NavLink className="nav-link" to="#"><i className="far fa-bell"></i> Notifications <span className="sr-only">(current)</span></NavLink>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;
