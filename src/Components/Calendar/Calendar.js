import React from "react";
import dateFns from "date-fns";
import "./Calendar.css";

export default class Calendar extends React.Component {
  constructor() {
    super();
  }

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    MaxDays: 1
  };

  componentDidMount() {
    this.setState({
      currentMonth: this.props.StartDate,
      MaxDays: this.props.MaxDays
    });
  }

  componentDidUpdate() {
    if (this.state.currentMonth !== this.props.StartDate)
      this.setState({ currentMonth: this.props.StartDate });
    if (this.state.MaxDays !== this.props.MaxDays)
      this.setState({ MaxDays: this.props.MaxDays });
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div>
        <div className="col col-start" />
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" />
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const StartDate = this.props.StartDate;
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let Count = 0;
    let Finished = false;
    while (day <= endDate) {
      if (Finished) break;
      for (let i = 0; i < 7; i++) {
        if (day >= StartDate) Count++;
        if (Count > this.state.MaxDays) {
          Finished = true;
          break;
        }
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const formattedCloneDay = dateFns.format(cloneDay, "dddd");
        const holidayCloneDay = dateFns.format(cloneDay, "MM/DD");
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart) || day < StartDate
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : formattedCloneDay.startsWith("S")
                ? "weekend"
                : holidayCloneDay.includes("01/01")
                ? "holiday"
                : holidayCloneDay.includes("07/04")
                ? "holiday"
                : holidayCloneDay.includes("12/31")
                ? "holiday"
                : holidayCloneDay.includes("12/25")
                ? "holiday"
                : holidayCloneDay.includes("05/27")
                ? "holiday"
                : holidayCloneDay.includes("09/02")
                ? "holiday"
                : holidayCloneDay.includes("10/31")
                ? "holiday"
                : holidayCloneDay.includes("11/11")
                ? "holiday"
                : holidayCloneDay.includes("1/21")
                ? "holiday"
                : "weekday"
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}
