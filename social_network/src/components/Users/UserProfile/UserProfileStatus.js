import React from 'react'
import styles from './UserProfileStatus.module.css'

class UserProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) =>{
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <>
            {
                this.state.editMode ?
                    <div><input onChange = {this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} className={styles.input}
                                type="text" value={this.state.status}/></div> :
                    <div><span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "I dont have status"}</span></div>
            }
        </>
    }
}

export default UserProfileStatus;
