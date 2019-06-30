import React from "react";
import dateFns from "date-fns";
import "./Display.css";

export default class Display extends Component {
  constructor() {
    super();
  }

  state = {
    StartDate: "03/7/2018",
    NumberOfDays: 5
  };

  // Waits for onBlur event to change startDate
  async DateChange(e) {
    console.log(e);
    await this.setState({ StartDate: e.target.value });
  }

  // Waits for onBlur event to change NumberofDays
  async MaxDateChange(e) {
    console.log(e);
    await this.setState({ NumberOfDays: e.target.value });
  }

  render() {
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
        Country Code:
        <input />
      </div>
    );
  }
}
