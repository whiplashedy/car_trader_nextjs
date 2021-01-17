import React, {useState} from 'react'
import styles from './Users.module.css'
import Preloader from "../common/Preloader/Preloader";
import {Link} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let Users = (props) => {
    let [portionNumber, setPortionNumber] = useState(1);


    let NextPortion = () =>{
        setPortionNumber(portionNumber + 1);
    }
    let PrevPortion = () =>{
        setPortionNumber(portionNumber - 1);
    }
    let allUsers = props.users.map(u => <div key={u.id}>
        <div><Link to={"/profile/" + u.id}><img className={styles.photo}
                                                src={u.uniqueUrlName || "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"}
                                                alt="userPhoto"/></Link></div>
        <div className={styles.name}>{u.name}</div>
        <div className={styles.button}>{u.followed ? <button onClick={() => {
                props.unfollowThunk(u.id);
            }}>Unfollow</button> :
            <button onClick={() => {
                props.followThunk(u.id);
            }}>Follow</button>}
        </div>
    </div>);

    if (props.isFetching) {
        return <div className={styles.users}><Preloader/></div>
    } else {
        return <div className={styles.users}><Paginator totalUsersCount={props.totalUsersCount}
                                                        pageSize={props.pageSize}
                                                        currentPage={props.currentPage}
                                                        onCurrentPageChange={props.onCurrentPageChange}
                                                        portionNumber = {portionNumber}
                                                        NextPortion = {NextPortion}
                                                        PrevPortion = {PrevPortion}/>{allUsers}
        </div>
    }
}

export default Users;
