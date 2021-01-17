import styles from './Login.module.css'
import React from 'react'
import LoginForm from "../../common/LoginForm/LoginForm";


let Login = (props) => {
    return <div className={styles.login}>{props.isAuth ? <div>Success: you logged in as {props.login}</div>
        : <LoginForm login = {props.login} errorMessage = {props.errorMessage}/>
        }


    </div>
}

export default Login;
