import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardDeck, Card, Button, CardTitle, CardText } from "reactstrap";

export default class Panel extends Component {
  render() {
    return (
      <CardDeck className="m-1">
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
    );
  }
}
