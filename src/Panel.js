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
    this.setState({ console: `${time} - ${this.state.console} ${event} \n` });
  }
  componentDidMount() {
    this.addInfoToConsole("Приложение запущено.");
  }
  render() {
    return (
      <div>
        <CardDeck>
          <Card className="text-center" body inverse color="info">
            <CardTitle>Рандомизация</CardTitle>
            <CardText>Произвести рандомизацию объектов</CardText>
            <Button>Начать</Button>
          </Card>

          <Card className="text-center" body inverse color="info">
            <CardTitle>Запуск</CardTitle>
            <CardText>Запустить обучение</CardText>
            <Button>Начать</Button>
          </Card>
        </CardDeck>
        <Card className="mt-1" body outline color="success">
          <CardTitle className="text-center">Журнал</CardTitle>
          <CardText className="text-center" id="console">
            Журнал отладки нейронной сети
          </CardText>
          <hr className="my-1" />
          <CardText>
            <Input
              className="text-muted"
              style={{ height: "200px", fontSize: "10px" }}
              type="textarea"
              name="text"
              id="console"
              value={this.state.console}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}
