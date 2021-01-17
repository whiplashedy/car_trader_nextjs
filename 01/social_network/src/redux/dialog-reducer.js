const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    newDialogText: "",
    dialogsData: [
        {id: 0, name: "Ayana"},
        {id: 1, name: "Nurs"},
        {id: 2, name: "Mura"},
        {id: 3, name: "Erj"}
    ],
    messages: [{id: 0, message: "Hi"}]
};

const dialogReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                newDialogText: action.message
            }
        case SEND_MESSAGE:
            let message = state.newDialogText;
            return {
                ...state,
                newDialogText: '',
                messages: [...state.messages, {id: 1, message: message}],
            }
        default:
            return state;
    }
}
export const actionCreatorSendMessage = () => ({type: SEND_MESSAGE});
export const actionCreatorUpdateMessageText = (text) => ({
    type: UPDATE_MESSAGE_TEXT,
    message: text
});
export default dialogReducer;
