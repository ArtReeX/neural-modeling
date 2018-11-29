import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import brainjs from "brain.js";

const configField = {
  backgroundUrl: "fon.jpg"
};

export default class Field extends Component {
  constructor(props) {
    super(props);

    this.state = { height: 1000, width: 2000 };

    this.fieldRef = React.createRef();

    this.startTrain = this.startTrain.bind(this);
    this.stopTrain = this.stopTrain.bind(this);
    this.renderBackgroundToField = this.renderBackgroundToField.bind(this);

    this.backgroundImage = new Image();
    this.backgroundImage.src = configField.backgroundUrl;
    this.backgroundImage.onload = () => {
      this.renderBackgroundToField(this.fieldRef.current, this.backgroundImage);
    };
  }
  startTrain(data, iterations, errorThresh, activation, hiddenLayers) {
    try {
      const {
        current: { addInfoToConsole }
      } = this.props.console;

      addInfoToConsole("Нейронная сеть перезапущена с новыми параметрами.");

      this.brain = new brainjs.recurrent.LSTM({
        hiddenLayers: hiddenLayers,
        activation: activation
      });

      this.training = setInterval(() => {
        this.brain.train(data, {
          iterations: 1 /*iterations*/,
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
      }, Math.max(Math.max.apply(null, hiddenLayers) * hiddenLayers.length, 100));
    } catch (error) {
      this.props.error(error.message);
    }
  }
  stopTrain() {
    clearInterval(this.training);
  }
  renderBackgroundToField(
    canvas = this.fieldRef.current,
    backgroundImage = this.backgroundImage
  ) {
    const { height, width } = this.state;
    canvas.getContext("2d").drawImage(backgroundImage, 0, 0, width, height);
  }
  renderField(canvas = this.fieldRef.current) {
    const {
      model: { hiddenLayers }
    } = this.brain;
    const layersWeights = hiddenLayers.map(layer => layer.outputBias.weights);

    console.log("Нейронная сеть", this.brain);
    console.log("Скрытые слои", hiddenLayers);
    console.log("Веса", layersWeights);

    this.renderBackgroundToField(this.fieldRef.current, this.backgroundImage);

    const context = canvas.getContext("2d");

    layersWeights.forEach((layerWeights, layerIndex) => {
      layerWeights.forEach((weight, weightIndex) => {
        const xOffset = this.state.width / layersWeights.length / 4;
        const yOffset = this.state.height / layerWeights.length / 4;
        const xPosition =
          (this.state.width / layersWeights.length) * layerIndex + xOffset;
        const yPosition =
          (this.state.height / layerWeights.length) * weightIndex + yOffset;
        const radius = Math.max(
          (Math.abs(weight) * Math.min(xOffset, yOffset)) / 2,
          Math.min(xOffset, yOffset) / 2
        );
        const fillStyle =
          weight <= 0 ? "rgba(255,45,84,255)" : "rgba(0,255,147,255)";
        context.lineWidth =
          Math.min(this.state.width, this.state.height) /
          layerWeights.length /
          100;

        // соединители
        context.beginPath();
        context.strokeStyle =
          weight <= 0 ? "rgba(0,0,0,255)" : "rgba(255,255,255,255)";
        if (layerIndex + 1 < layersWeights.length) {
          layersWeights[layerIndex + 1].forEach((weight, weightIndex) => {
            const xOffsetNext = this.state.width / layersWeights.length / 4;
            const yOffsetNext =
              this.state.height / layersWeights[layerIndex + 1].length / 4;
            const xPositionNext =
              (this.state.width / layersWeights.length) * (layerIndex + 1) +
              xOffsetNext;
            const yPositionNext =
              (this.state.height / layersWeights[layerIndex + 1].length) *
                weightIndex +
              yOffsetNext;

            context.moveTo(xPosition, yPosition);
            context.lineTo(xPositionNext, yPositionNext);
          });
        }
        context.stroke();
        context.closePath();

        // веса
        context.beginPath();
        context.arc(xPosition, yPosition, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.strokeStyle = "rgba(255,255,255,255)";
        context.fillStyle = fillStyle;
        context.fill();
        context.stroke();
      });
    });
  }
  render() {
    return (
      <Card className="m-3" body outline color="secondary">
        <CardTitle className="text-center">Модель развития</CardTitle>
        <hr className="my-1" />
        <InputGroup>
          <InputGroupAddon addonType="prepend">Высота</InputGroupAddon>
          <Input
            style={{ fontSize: "10px" }}
            type="number"
            placeholder="****"
            defaultValue="1000"
            onChange={value => {
              this.setState({ height: value.target.value });
              this.renderBackgroundToField(
                this.fieldRef.current,
                this.backgroundImage
              );
            }}
          />
          <InputGroupAddon addonType="prepend">Ширина</InputGroupAddon>
          <Input
            style={{ fontSize: "10px" }}
            type="number"
            placeholder="****"
            defaultValue="3000"
            onChange={value => {
              this.setState({ width: value.target.value });
              this.renderBackgroundToField(
                this.fieldRef.current,
                this.backgroundImage
              );
            }}
          />
        </InputGroup>
        <hr className="my-1" />
        <CardBody>
          <canvas
            ref={this.fieldRef}
            height={this.state.height}
            width={this.state.width}
            style={{
              width: "100%"
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

Field.propTypes = {
  console: PropTypes.shape({
    current: PropTypes.shape({
      addInfoToConsole: PropTypes.func,
      error: PropTypes.func.isRequired
    })
  })
};
