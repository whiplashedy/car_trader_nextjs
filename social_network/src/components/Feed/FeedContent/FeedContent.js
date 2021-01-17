import React from "react";
import classes from './FeedContent.module.css'
import MyPosts from "../MyPosts/MyPosts";
import {Redirect} from "react-router-dom";

const FeedContent = (props) => {

    if(!props.isAuth) return <Redirect to = {"/login"} />

    let newPost = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () =>{
        let postChange = newPost.current.value;
        props.updatePostText(postChange);

    }

    return (
        <div className={classes.feed}>
            <div className={classes.feedMessage}>
            <div className="md-form">
                <i className={`${classes.icon} fas fa-user-astronaut`}></i>
                <input id="input-char-counter" ref = {newPost} placeholder="What's happening?" onChange ={onPostChange}
                                                                 value = {props.newPostText}
                                                                 length="80"
                                                                 className={`${classes.input} form-control  border-0`}/>
                <button type="button" onClick = {addPost} className={`${classes.button} + btn btn-outline-primary border-0`}>Tweet
                </button>
            </div>
            </div>
            <MyPosts posts = {props.posts}/>
        </div>
    );
}

export default FeedContent;
