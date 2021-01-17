import React from 'react'
import ProfileDialogs from "./ProfileDialogs";
import {connect} from "react-redux";
import {actionCreatorSendMessage, actionCreatorUpdateMessageText} from "../../../redux/dialog-reducer";

let mapStateToProps = (state) => {
    return{
        messages: state.dialogPage.messages,
        dialogsData: state.dialogPage.dialogsData,
        newDialogText: state.dialogPage.newDialogText
    }
}
let mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: () => {
            dispatch(actionCreatorSendMessage());
        },
        updateMessageText: (text) => {
            dispatch(actionCreatorUpdateMessageText(text))
        }
    }
}

const ProfileDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileDialogs);

export default ProfileDialogsContainer;

