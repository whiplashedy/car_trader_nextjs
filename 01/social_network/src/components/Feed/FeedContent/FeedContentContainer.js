import {actionCreatorAddPost, actionCreatorUpdatePostText} from "../../../redux/feed-reducer";
import FeedContent from "./FeedContent";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return{
        posts: state.feedPage.posts,
        newPostText: state.feedPage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        addPost: () => {
            dispatch(actionCreatorAddPost());
        },
        updatePostText: (text) => {
            dispatch(actionCreatorUpdatePostText(text))
        }
    }
}

const FeedContentContainer = connect(mapStateToProps, mapDispatchToProps)(FeedContent);

export default FeedContentContainer;
