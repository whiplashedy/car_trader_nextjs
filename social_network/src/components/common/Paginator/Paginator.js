import React from 'react'
import {Button} from "@material-ui/core";
import styles from './Paginator.module.css'

let Paginator = (props) =>{
    let pagesCount = props.totalUsersCount / props.pageSize;
    let pages = [];
    for (let i = 1; i <= Math.ceil(pagesCount); i++) {
        pages.push(i);
    }
    let portionSize = 5;
    let portionCount = pagesCount/portionSize;

    let leftPortionNumber = portionSize * (props.portionNumber - 1) + 1;
    let rightPortionNumber = portionSize * props.portionNumber;

    let new_pages = pages.filter(el=>{
        return el >= leftPortionNumber && el <=rightPortionNumber;
    }).map(el => {
        return <span className={(props.currentPage === el && styles.selectedPage) || styles.pages} onClick={() => {
            props.onCurrentPageChange(el);
        }}>{el} </span>

    })
    return (<div> {props.portionNumber > 1 ?<Button color="primary" onClick={props.PrevPortion}>prev</Button> : null} {new_pages} {props.portionNumber < portionCount ? <Button color="primary" onClick={props.NextPortion}>next</Button> : null}</div>)
}
export default Paginator;
