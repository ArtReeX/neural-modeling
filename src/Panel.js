import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  FormGroup,
  Label,
  CardDeck,
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  Input,
  Badge
} from "reactstrap";

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = { startTrainHidden: false, stopTrainHidden: true };

    this.iterationsRef = React.createRef();
    this.errorThreshRef = React.createRef();
    this.activationRef = React.createRef();
    this.hiddenLayersRef = React.createRef();
    this.dataRef = React.createRef();

    this.startTrain = this.startTrain.bind(this);
    this.stopTrain = this.stopTrain.bind(this);
  }
  startTrain() {
    this.setState({
      startTrainHidden: true,
      stopTrainHidden: false
    });

    this.props.startTrain(
      this.dataRef.current.value,
      this.iterationsRef.current.value,
      this.errorThreshRef.current.value,
      this.activationRef.current.value,
      this.hiddenLayersRef.current.value
    );
  }
  stopTrain() {
    this.setState({
      startTrainHidden: false,
      stopTrainHidden: true
    });

    this.props.stopTrain();
  }
  render() {
    return (
      <CardDeck className="m-1">
        <Card className="text-center" body inverse color="dark">
          <CardTitle>Режим</CardTitle>
          <CardText>Параметры обучения</CardText>
          <Form>
            <FormGroup>
              <Label for="mode" className="small">
                Данные для обучения
              </Label>
              <Input
                style={{ height: "100px", fontSize: "10px" }}
                type="textarea"
                name="text"
                innerRef={this.dataRef}
                placeholder="[{input: [...]}, output: [...], ...]"
                defaultValue={JSON.stringify([
                  { input: [1, 1, 1, 2], output: [1, 2] },
                  { input: [2, 2, 2, 3], output: [2, 3] },
                  { input: [3, 3, 3, 4], output: [3, 4] },
                  { input: [4, 4, 4, 5], output: [4, 5] },
                  { input: [5, 5, 5, 6], output: [5, 6] }
                ])}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hiddenLayers" className="small">
                Количество нейронов в скрытых слоях
              </Label>
              <Input
                style={{ fontSize: "10px" }}
                type="text"
                innerRef={this.hiddenLayersRef}
                placeholder="[*, *, *, ...]"
                defaultValue="[1, 1, 1, 5, 5, 3, 3]"
              />
            </FormGroup>
            <FormGroup hidden>
              <Label for="iterations" className="small">
                Количество итераций обучения
              </Label>
              <Input
                style={{ fontSize: "10px" }}
                type="text"
                innerRef={this.iterationsRef}
                placeholder="10"
                defaultValue="50"
              />
            </FormGroup>
            <FormGroup>
              <Label for="iterations" className="small">
                Функция активации
              </Label>
              <Input
                style={{ fontSize: "10px" }}
                type="text"
                innerRef={this.activationRef}
                placeholder="sigmoid/relu/leaky-relu/tanh"
                defaultValue="sigmoid"
              />
            </FormGroup>
            <FormGroup>
              <Label for="iterations" className="small">
                Порог ошибок
              </Label>
              <Input
                style={{ fontSize: "10px" }}
                type="text"
                innerRef={this.errorThreshRef}
                placeholder="*.***"
                defaultValue="0.005"
              />
            </FormGroup>
          </Form>
        </Card>

        <Card className="text-center" body inverse color="dark">
          <CardTitle>Запуск</CardTitle>
          <CardText>Запустить обучение</CardText>
          <CardBody>
            <h2>
              Обучение производится в нейронной сети на основе{" "}
              <Badge color="light">LSTM</Badge>
            </h2>{" "}
            <small>– сети долгой краткосрочной памяти</small>
          </CardBody>
          <Button
            className="m-1"
            color="success"
            hidden={this.state.startTrainHidden}
            onClick={this.startTrain}
          >
            Начать
          </Button>
          <Button
            className="m-1"
            color="danger"
            hidden={this.state.stopTrainHidden}
            onClick={this.stopTrain}
          >
            Остановить
          </Button>
        </Card>
      </CardDeck>
    );
  }
}

Panel.propTypes = {
  startTrain: PropTypes.func.isRequired,
  stopTrain: PropTypes.func.isRequired
};
