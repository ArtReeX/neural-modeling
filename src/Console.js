import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Card, CardTitle, CardText } from "reactstrap";

export default class Console extends Component {
  constructor(props) {
    super(props);

    this.state = { console: "" };

    this.addInfoToConsole = this.addInfoToConsole.bind(this);
  }
  addInfoToConsole(event) {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    this.setState({
      console: `${this.state.console}\n${time} - ${event}`.trim()
    });
  }
  componentWillMount() {
    this.addInfoToConsole("Приложение запущено.");
  }
  render() {
    return (
      <Card className="m-3" body outline color="secondary">
        <CardTitle className="text-center">Журнал</CardTitle>
        <CardText className="text-center" id="console">
          Журнал отладки нейронной сети
        </CardText>
        <hr className="my-1" />
        <CardText>
          <Input
            className="text-muted"
            style={{ height: "150px", fontSize: "10px" }}
            type="textarea"
            name="text"
            id="console"
            value={this.state.console}
            readOnly
          />
        </CardText>
      </Card>
    );
  }
}
