import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import brainjs from "brain.js";

export default class Field extends Component {
  constructor(props) {
    super(props);

    this.fieldRef = React.createRef();
  }
  start(data, iterations, errorThresh, hiddenLayers) {
    const {
      current: { addInfoToConsole }
    } = this.props.console;

    addInfoToConsole("Нейронная сеть перезапущена с новыми параметрами.");

    this.brain = new brainjs.recurrent.LSTM({
      hiddenLayers: hiddenLayers
    });

    this.brain.train(data, {
      iterations: iterations,
      errorThresh: errorThresh,
      log: event => addInfoToConsole(event),
      logPeriod: 10,
      learningRate: 0.3,
      momentum: 0.1,
      callbackPeriod: 10,
      timeout: null,
      callback: () => {
        this.renderField(this.fieldRef.current);
      }
    });
  }
  renderField(canvas = this.fieldRef.current) {
    const context = canvas.getContext("2d");
  }
  render() {
    return (
      <Card className="m-3" body outline color="secondary">
        <CardTitle className="text-center">Модель развития</CardTitle>
        <hr className="my-1" />
        <CardBody>
          <canvas ref={this.fieldRef} height="1000" width="1000" />
        </CardBody>
      </Card>
    );
  }
}

Field.propTypes = {
  console: PropTypes.shape({
    current: PropTypes.shape({
      addInfoToConsole: PropTypes.func
    })
  })
};
