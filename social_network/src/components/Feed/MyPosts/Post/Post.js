import React from "react";
import styles from "./Post.module.css"
const Post = (props) => {
    return (
        <div className={styles.post}>
            {props.content}
        </div>
    );
}

export default Post;
