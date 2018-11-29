import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import Header from "./Header";
import Panel from "./Panel";
import Field from "./Field";
import Console from "./Console";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.consoleRef = React.createRef();
    this.fieldRef = React.createRef();

    this.reCreateBrain = this.reCreateBrain.bind(this);
  }
  reCreateBrain(data, iterations, errorThresh, hiddenLayers) {
    this.fieldRef.current.start(
      JSON.parse(data),
      JSON.parse(iterations),
      JSON.parse(errorThresh),
      JSON.parse(hiddenLayers)
    );
  }

  render() {
    return (
      <Container
        className="w-100 h-100"
        fluid
        pref="bg.jpg"
        style={{
          backgroundImage: "url(bg.jpg)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          userSelect: "none"
        }}
      >
        <Header />
        <Panel reCreateBrain={this.reCreateBrain} />
        <Field ref={this.fieldRef} console={this.consoleRef} />
        <Console ref={this.consoleRef} />
      </Container>
    );
  }
}
