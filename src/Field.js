import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody, CardTitle } from "reactstrap";

export default class Field extends Component {
  render() {
    return (
      <Card className="m-1" body outline color="secondary">
        <CardTitle className="text-center">Модель развития</CardTitle>
        <hr className="my-1" />
        <CardBody />
      </Card>
    );
  }
}
