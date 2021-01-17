import React from 'react'
import classes from './ProfileDialogs.module.css'
import {NavLink, Route} from "react-router-dom";
import ProfileMessage from "./ProfileMessage/ProfileMessage";

const ProfileDialog = (props) => (
    <div>
        <NavLink to={"/messages/" + props.id}>{props.name}</NavLink>
        <div>
            {props.message}
        </div>
    </div>
)


const ProfileDialogs = (props) => {
    let newDialogData = props.dialogsData.map( (el) => <ProfileDialog name ={el.name} key ={el.id} id = {el.id} message="Hi, Nysrs"/>
    )
    let archive = props.messages.map(el => <div>{el.message}</div>);
    let eachMessageArchive =
        props.messages.map( (el) => <Route key ={el.id} path = {"/messages/" + el.id} render ={() => <ProfileMessage archive = {archive} newDialogText = {props.newDialogText} updateMessageText = {props.updateMessageText} sendMessage = {props.sendMessage} />
            }/>
        )

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialog}>{newDialogData}</div>
            <div className={classes.message}>{eachMessageArchive}</div>
        </div>
    )
}
export default ProfileDialogs;
