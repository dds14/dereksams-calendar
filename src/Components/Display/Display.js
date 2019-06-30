import React from "react";
import dateFns from "date-fns";
import Calendar from "../Calendar/Calendar";
import "./Display.css";

export default class Display extends React.Component {
  state = {
    StartDate: "03/7/2018",
    NumberOfDays: 5
  };

  async DateChange(e) {
    console.log(e);
    await this.setState({ StartDate: e.target.value });
  }

  async MaxDateChange(e) {
    console.log(e);
    await this.setState({ NumberOfDays: e.target.value });
  }

  render() {
    let Calendars = [];
    var result = dateFns.addDays(this.state.StartDate, this.state.NumberOfDays);
    let Start = new Date(this.state.StartDate);
    while (result >= Start) {
      Calendars.push({
        StartDate: Start,
        RemainingDays: dateFns.differenceInCalendarDays(result, Start)
      });
      Start = dateFns.addMonths(Start, 1);
    }

    console.log(<Calendars />);
    return (
      <div>
        Start Date:{" "}
        <input
          defaultValue={"03/07/2018"}
          onBlur={this.DateChange.bind(this)}
        />
        Number Of Days:{" "}
        <input
          defaultValue={this.state.NumberOfDays}
          onBlur={this.MaxDateChange.bind(this)}
        />
        Country Code
        <input />
        {Calendars.map(A => {
          return (
            <Calendar
              MaxDays={A.RemainingDays}
              StartDate={new Date(A.StartDate)}
            />
          );
        })}
      </div>
    );
  }
}
