import React, {useState} from "react";
import moment from "moment";

import classes from "./Calendar.module.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Calendar = props => {

    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [momentContext, setMomentContext] = useState(moment());
    const [today] = useState(moment());
    
    // useEffect(() => console.log("Rendered"));

    //Check
    const weekdaysShort = moment.weekdaysShort();
    const months = moment.months();

    const year = () => momentContext.format("Y");
    const month = () => momentContext.format("MMMM");
    const daysInMonth = () => momentContext.daysInMonth();
    const currentDay = () => momentContext.format("D");

    // console.log(year());
    // console.log(month());
    // console.log(daysInMonth());
    // console.log(currentDay());
    
    const firstDayOfMonth = () => {
        const dateContext = momentContext;
        const firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    }

    const navToCurrentDateHandler = () => {
        setMomentContext(today);
    }

    const onYearClickHandler = () => {
        setShowYears(!showYears);
        setShowMonths(false);
    }

    const yearChangeHandler = (event, year) => {
        if(event.target.value.length === 4){
            const dateContext = moment(momentContext).set("year", event.target.value);
            setMomentContext(dateContext);
        }
    }

    const yearSubmitHandler = () => {
        setShowYears(false);
        setShowMonths(true);
    }

    const YearNav = () => {
        return (
            showYears ? 
            <div>
                <input style={{width:"60px"}} onChange={(event) => yearChangeHandler(event)} type="number" value={year()}/>
                <button onClick={(event) => yearSubmitHandler(event)}>Ok</button>
            </div> : 
            <div onClick={onYearClickHandler}>{year()}</div>
            
        )
    }


    //Month Navigation Part Ahead
    const onMonthClickHandler = () => {
        setShowMonths(!showMonths);
        setShowYears(false);
    }

    const changeMonthHandler = (event, month) => {
        const dateContext = moment(momentContext).set("month", month);
        setMomentContext(dateContext);
        setShowMonths(false);
    }
    
    // const monthList = months.map((month, index) => {
    //     return <span key={index} onClick={(event) => changeMonthHandler(event, month)} className={classes.MonthNavMonth}>{month}</span>
    // });

    let monthRow = [];
    let monthsCol = [];
    
    months.forEach((month, index) => {
        if(index!==0 && index % 3 === 0){
            monthRow.push(monthsCol);
            monthsCol = [];
            monthsCol.push(<span key={index} onClick={(event) => changeMonthHandler(event, month)} className={classes.MonthNavMonth}>{month}</span>);
        }else{
            monthsCol.push(<span key={index} onClick={(event) => changeMonthHandler(event, month)} className={classes.MonthNavMonth}>{month}</span>);
        }
        if(index === months.length-1){
            monthRow.push(monthsCol);
        }
    });

    const monthList = monthRow.map((month, index) => <div key={index}>{month}</div>)
    
    console.log("MonthList", monthList);
    
    const MonthNav = () => {
        return (
            <div>
                <span onClick={onMonthClickHandler}>{month()}</span>
                {showMonths && 
                <div className={classes.MonthNav}>{monthList}</div>}
            </div>
        )
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


    const dayClickHandler = (day, month, year) => {
        alert(`Date selected is ${day}-${month}-${year}`);
    }

    // console.log(weekdaysShort);
    const weekDayHeading = weekdaysShort.map((weekDay, index) => <th key={index}>{weekDay}</th>);
    // console.log(weekDayHeading);

    const blanks = [];
    for(let i = 0; i < firstDayOfMonth(); i++){
        blanks.push(<td key={i*80}>{" "}</td>);
    }

    const daysInMonthTable = [];
    for(let i = 1; i <= daysInMonth(); i++){
        const classesArray = [(i === +currentDay() && year() === today.format("Y") && month() === today.format("MMMM") ) ? classes.CurrentDay : null];

        daysInMonthTable.push(<td onClick={() => dayClickHandler(i, month(), year())} key={i*100}><span className={classesArray.join(" ")}>{i}</span></td>);
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
                    <td colSpan="3">
                        <MonthNav />
                    </td>
                    <td colSpan ="3">
                        <YearNav />
                    </td>
                    <td>
                        <ArrowBackIosIcon onClick={prevMonthClickHandler} />
                        <ArrowForwardIosIcon onClick={nextMonthClickHandler} />
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
            <button onClick={navToCurrentDateHandler}>Go back to current date</button>}
        </div>
    );
}

export default Calendar;