import React from 'react'
import styles from './Users.module.css'
import Preloader from "../common/Preloader/Preloader";
import {Link} from "react-router-dom";
import axios from "axios";

let Users = (props) => {
    let pagesCount = props.totalUsersCount / 200 / props.pageSize;
    let pages = [];
    for (let i = 1; i <= Math.ceil(pagesCount); i++) {
        pages.push(i);
    }
    let new_pages = pages.map(el => {
        return <span className={props.currentPage === el && styles.selectedPage} onClick={() => {
            props.onCurrentPageChange(el);
        }}>{el} </span>
    })
    let allUsers = props.users.map(u => <div key={u.id}>
        <div><Link to={"/profile/" + u.id}><img className={styles.photo}
                                                src={u.uniqueUrlName || "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"}
                                                alt="userPhoto"/></Link></div>
        <div>{u.name}</div>
        <div>{u.followed ? <button onClick={() => {
                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                    withCredentials: true,
                    headers:{
                        "API-KEY": "d15d7348-4ece-473f-8a37-b695d617fccb"
                    }
                }).then(response => {
                    if (response.data.resultCode === 0) {
                        props.unfollow(u.id)
                    }

                }).catch(e =>{
                    console.log(e);
                })
            }}>Unfollow</button> :
            <button onClick={() => {
                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                    withCredentials: true,
                    headers:{
                        "API-KEY": "d15d7348-4ece-473f-8a37-b695d617fccb"
                    }
                }).then(response => {
                    if (response.data.resultCode === 0) {
                        props.follow(u.id)
                    }

                }).catch(e =>{
                    console.log(e);
                })

            }}>Follow</button>}
        </div>
    </div>);

    if (props.isFetching) {
        return <div className={styles.users}><Preloader/></div>
    } else {
        return <div className={styles.users}>
            <div>{new_pages}</div>
            {allUsers}</div>
    }
}

export default Users;
