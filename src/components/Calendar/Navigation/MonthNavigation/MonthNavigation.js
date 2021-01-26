import React from "react";
import classes from "./MonthNavigation.module.css";

const MonthNav = props => {

    const monthList = props.months.map((month, index) => {
        return <span key={index} onClick={(event) => props.change(event, month)} className={classes.MonthNavMonth}>{month.substr(0,3)}</span>
    });

    return (
        <React.Fragment>
            <span className={classes.CursorPointer} onClick={props.click}>{props.month}</span>
            {props.showMonths && 
            <div className={classes.MonthNav}>{monthList}</div>}
        </React.Fragment>
    )
}

export default MonthNav;