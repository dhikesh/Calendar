import React from "react";
import Calendar from "./components/Calendar/Calendar";

import './App.css';

const App = () => {

  const dayClickHandler = (day, month, year) => {
    alert(`Date selected is ${day}-${month}-${year}`);
  }

  return (
    <div className="calendarContainer">
      <Calendar dayClick={dayClickHandler} />
    </div>
    );
}

export default App;
