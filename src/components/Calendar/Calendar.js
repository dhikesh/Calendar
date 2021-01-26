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
    const [endDate, setEndDate] = useState(null); 
    // useEffect(() => console.log("Rendered"));
    
    //Check
    const weekdaysShort = moment.weekdaysShort();
    const months = moment.months();
    
    
    const year = () => momentContext.format("Y");
    const [startDate, setStartDate] = useState(year()); 
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
        setShowMonths(true);
    }

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

    const yearTable = (key) => {


        let twelveYears = getTwelveYears(key === "add" ? startDate : endDate, key);

        // console.log(twelveYears);
        setStartDate(twelveYears[twelveYears.length - 1])
        setEndDate(twelveYears[0])

        // console.log(twelveYears);
        const formatTwelve = twelveYears.map((year, index) => (
            <span onClick={(event) => yearSelectHandler(event, year)} key={index}>{year}</span>
        ));

        console.log(formatTwelve);

        return (
            <div>
                <ArrowBackIosIcon onClick={() => yearTable("sub")} />
                <ArrowForwardIosIcon onClick={() => yearTable("add")} />
                <div className={classes.MonthNav}>
                    {formatTwelve}
                </div>
            </div>

        )
    }
   

    const YearNav = () => {
        return (
            <React.Fragment>
                <div onClick={onYearClickHandler}>{year()}</div>
                {showYears && yearTable("add")}
            </React.Fragment>
            
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
    
    const monthList = months.map((month, index) => {
        return <span key={index} onClick={(event) => changeMonthHandler(event, month)} className={classes.MonthNavMonth}>{month.substr(0,3)}</span>
    });
    
    const MonthNav = () => {
        return (
            <React.Fragment>
                <span onClick={onMonthClickHandler}>{month()}</span>
                {showMonths && 
                <div className={classes.MonthNav}>{monthList}</div>}
            </React.Fragment>
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
                    <td style={{ position: 'relative' }} colSpan="3">
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