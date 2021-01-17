import React from "react"
import s from "./ProfileMessage.module.css";

const ProfileMessage = (props) => {

    let newMessage = React.createRef();

    let sendMessage = () =>{
        props.sendMessage();
    }
    let onMessageText = () =>{
        let text = newMessage.current.value;
        props.updateMessageText(text);
    }

    return (
        <div>
            <div>{props.archive}</div>
            <div className="md-form">
                <input id="input-char-counter" ref={newMessage} onChange={onMessageText}
                       placeholder="Write a message"
                       value={props.newDialogText}
                       length="80"
                       className={`${s.input} form-control`}/>
                <button type="button" onClick={sendMessage}
                        className={`${s.button} + btn btn-outline-primary border-0`}>Enter
                </button>
            </div>
        </div>
    )
}

export default ProfileMessage;
