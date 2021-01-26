import React, {useState} from "react";
import moment from "moment";

import classes from "./Calendar.module.css";
import MonthNav from "./Navigation/MonthNavigation/MonthNavigation";
import YearNav from "./Navigation/YearNavigation/YearNavigation";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';

const Calendar = props => {

    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [momentContext, setMomentContext] = useState(moment());
    const [today] = useState(moment());
    const [yearNavControl, setYearnavControl] = useState({
        year : momentContext.format("Y"),
        key : "add"
    });
    
    const weekdaysShort = moment.weekdaysShort();
    const months = moment.months();
    
    const year = () => momentContext.format("Y");
    const month = () => momentContext.format("MMMM");
    const daysInMonth = () => momentContext.daysInMonth();
    const currentDay = () => momentContext.format("D");

    
    const firstDayOfMonth = () => {
        const dateContext = momentContext;
        const firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    }

    const navToCurrentDateHandler = () => {
        setMomentContext(today);
    }

    const onYearClickHandler = (year) => {
        setShowYears(!showYears);
        setShowMonths(false);
    }

    const yearSelectHandler = (event, year) => {
        const dateContext = moment(momentContext).set("year", year);
        setMomentContext(dateContext);
        setShowYears(false);
    }

    const onMonthClickHandler = () => {
        setShowMonths(!showMonths);
        setShowYears(false);
    }

    const changeMonthHandler = (event, month) => {
        const dateContext = moment(momentContext).set("month", month);
        setMomentContext(dateContext);
        setShowMonths(false);
    }

    const nextMonthClickHandler = () => {
        const dateContext = moment(momentContext).add(1, "month");
        setMomentContext(dateContext);
        setShowYears(false);
        setShowMonths(false);
    }
    
    const prevMonthClickHandler = () => {
        const dateContext = moment(momentContext).subtract(1, "month");
        setMomentContext(dateContext);
        setShowYears(false);
        setShowMonths(false);
    }

    const weekDayHeading = weekdaysShort.map((weekDay, index) => <th key={index}>{weekDay}</th>);

    const blanks = [];
    for(let i = 0; i < firstDayOfMonth(); i++){
        blanks.push(<td key={i*80}>{" "}</td>);
    }

    const daysInMonthTable = [];
    for(let i = 1; i <= daysInMonth(); i++){
        const isCurrentDay = i === +currentDay() && year() === today.format("Y") && month() === today.format("MMMM")
        const classesArray = [isCurrentDay && classes.CurrentDay, classes.CursorPointer];

        daysInMonthTable.push(<td key={i*100}><span onClick={() => props.dayClick(i, month(), year())} className={classesArray.join(" ")}>{i}</span></td>);
    }

    const totalSlots = [...blanks, ...daysInMonthTable];
    const rows = [];
    let cols = [];

    totalSlots.forEach((day, index) => {
        if(index % 7 === 0 && index !== 0){
            rows.push(cols);
            cols = [];
            cols.push(day);
        }else{
            cols.push(day);
        }
        if(index === totalSlots.length-1){
            rows.push(cols);
        }
    });
    
    const trElements = rows.map((row, index) => {
        return (
            <tr className={classes.dateCell} key={index}>
                {row}
            </tr>
        )
    })
  

    return (
        <div className={classes.Calendar}>
            <table className={classes.CalendarTable}>
                <thead className={classes.TableHeader}>
                <tr>
                    <td style={{ position: 'relative' }} colSpan="3">
                        <MonthNav 
                        click={onMonthClickHandler}
                        change={changeMonthHandler}
                        showMonths={showMonths}
                        month={month()}
                        months={months} />
                    </td>
                    
                    <td style={{ position: 'relative' }} colSpan="3">
                        <YearNav
                            click ={onYearClickHandler}
                            year = {year()}
                            showyear ={showYears}
                            yearNavControl = {yearNavControl}
                            yearselect = {yearSelectHandler}
                            setYearnavControl ={setYearnavControl}
                        />
                    </td>
                    <td>
                        <ArrowBackIosIcon className={classes.CursorPointer} onClick={prevMonthClickHandler} />
                        {"   "}
                        <ArrowForwardIosIcon className={classes.CursorPointer} onClick={nextMonthClickHandler} />
                    </td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        {weekDayHeading}
                    </tr>
                    {trElements}
                </tbody>
            </table>
            {momentContext.format('MM/DD/YYYY') !== today.format('MM/DD/YYYY') && 
            <div className={classes.NavToCurrDay}>
                <span className={classes.TooltipText}>Go to Current Date</span>
                <TodayRoundedIcon className={classes.NavToCurrDayIcon} onClick={navToCurrentDateHandler} />
            </div>}
        </div>
    );
}

export default Calendar;