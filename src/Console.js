import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, CardDeck, Card, Button, CardTitle, CardText } from "reactstrap";

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = { console: "" };

    this.addInfoToConsole.bind(this);
  }
  addInfoToConsole(event) {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    this.setState({
      console: `\n ${time} - ${this.state.console} ${event}`.trim()
    });
  }
  componentDidMount() {
    this.addInfoToConsole("Приложение запущено.");
  }
  render() {
    return (
      <Card className="m-1" body outline color="secondary">
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
          />
        </CardText>
      </Card>
    );
  }
}
