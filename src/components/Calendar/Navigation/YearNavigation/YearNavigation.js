import React from 'react';
import  classes from './YearNavigation.module.css';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const YearNav = props => {

    const getTwelveYears = (year, key) => {
        const yearArray = [];
        for(let i = 0; i < 12; i++){
            if(key === "add"){
                yearArray.push(year++);
            }else if(key === "sub"){
                yearArray.push(year--);
            }
        }
        return yearArray.sort();

    }


    const twelveYears = getTwelveYears(props.yearNavControl.year, props.yearNavControl.key);


    const formatTwelve = twelveYears.map((year, index) => (
        <span className={classes.MonthNavMonth} onClick={(event) => props.yearselect(event, year)} key={index}>{year}</span>
    ));

  
    return (
        <React.Fragment>
            <span className={classes.CursorPointer} onClick={props.click}>{props.year}</span>
            {props.showyear &&
            <div className={classes.YearNav}>
                <div className={classes.LeftRightYearNav}>
                    <ArrowBackIosIcon onClick={() => props.setYearnavControl({year : twelveYears[0], key: "sub"})} />
                    <ArrowForwardIosIcon onClick={() => props.setYearnavControl({year : twelveYears[twelveYears.length-1], key: "add"})} />
                </div>
                <div className={classes.YearList}>
                    {formatTwelve}
                </div>
            </div> }
        </React.Fragment>
        
    )

}

export default YearNav;