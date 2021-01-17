import React from "react";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let new_posts = props.posts.map(el => (<Post content = {el}/>));
    return (
        <div>
            {new_posts}
        </div>
    );
}

export default MyPosts;
