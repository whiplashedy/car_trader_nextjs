import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";

let Navbar = (props) =>{
    return <div className={styles.navbar}>{props.isAuth ? <div className = {styles.user}>logined as: {props.login}</div> : <NavLink to = "/login" className = {styles.login}>login</NavLink>}</div>
}

export default Navbar;
