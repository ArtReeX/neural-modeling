import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import Header from "./Header";
import Panel from "./Panel";
import Field from "./Field";
import Console from "./Console";

export default class App extends PureComponent {
  render() {
    return (
      <Container fluid>
        <Header />
        <Panel />
        <Field />
        <Console />
      </Container>
    );
  }
}
