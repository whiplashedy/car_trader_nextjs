import React from 'react'
import ProfileDialogs from "./ProfileDialogs";
import {connect} from "react-redux";
import {actionCreatorSendMessage, actionCreatorUpdateMessageText} from "../../../redux/dialog-reducer";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return{
        messages: state.dialogPage.messages,
        dialogsData: state.dialogPage.dialogsData,
        newDialogText: state.dialogPage.newDialogText
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(actionCreatorSendMessage());
        },
        updateMessageText: (text) => {
            dispatch(actionCreatorUpdateMessageText(text))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),WithAuthRedirect)(ProfileDialogs)


