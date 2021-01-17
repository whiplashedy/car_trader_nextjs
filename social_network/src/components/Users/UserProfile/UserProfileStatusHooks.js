import React, {useEffect, useState} from 'react'
import styles from './UserProfileStatus.module.css'

const UserProfileStatusHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() =>{
        setStatus(props.status);
    }, [props.status])

    let activateEditMode = () => {
       setEditMode(true);
    }
    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onStatusChange = (e) =>{
        setStatus(e.currentTarget.value);
    }
    return <>
        {
            editMode ?
                <div><input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                            className={styles.input}
                            type="text" value={status}/></div> :
                <div><span
                    onDoubleClick={activateEditMode}>{status || "I dont have status"}</span>
                </div>
        }
    </>
}

export default UserProfileStatusHooks;
