import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "reactstrap";
import Header from "./Header";
import Panel from "./Panel";
import Field from "./Field";
import Console from "./Console";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.consoleRef = React.createRef();
    this.fieldRef = React.createRef();

    this.state = { alert: "", alertHidden: true };

    this.startTrain = this.startTrain.bind(this);
    this.stopTrain = this.stopTrain.bind(this);
    this.error = this.error.bind(this);
  }
  startTrain(data, iterations, errorThresh, activation, hiddenLayers) {
    try {
      this.fieldRef.current.startTrain(
        JSON.parse(data),
        JSON.parse(iterations),
        JSON.parse(errorThresh),
        activation,
        JSON.parse(hiddenLayers)
      );
    } catch (error) {
      this.error(error.message);
    }
  }
  stopTrain() {
    this.fieldRef.current.stopTrain();
  }
  error(message) {
    this.setState({ alert: message, alertHidden: false });
    setTimeout(() => {
      this.setState({ alertHidden: true });
    }, 2000);
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
        <Panel startTrain={this.startTrain} stopTrain={this.stopTrain} />
        <Alert className="m-3" color="danger" hidden={this.state.alertHidden}>
          {this.state.alert}
        </Alert>
        <Field
          ref={this.fieldRef}
          console={this.consoleRef}
          error={this.error}
        />
        <Console ref={this.consoleRef} />
      </Container>
    );
  }
}
