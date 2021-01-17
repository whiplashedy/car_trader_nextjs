import {actionCreatorAddPost, actionCreatorUpdatePostText} from "../../../redux/feed-reducer";
import FeedContent from "./FeedContent";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";


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

export default compose(connect(mapStateToProps, mapDispatchToProps), WithAuthRedirect)(FeedContent);
