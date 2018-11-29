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
  Input
} from "reactstrap";

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.iterationsRef = React.createRef();
    this.errorThreshRef = React.createRef();
    this.hiddenLayersRef = React.createRef();
    this.dataRef = React.createRef();

    this.reCreateBrain = this.reCreateBrain.bind(this);
  }
  reCreateBrain() {
    this.props.reCreateBrain(
      this.dataRef.current.value,
      this.iterationsRef.current.value,
      this.errorThreshRef.current.value,
      this.hiddenLayersRef.current.value
    );
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
                  { input: [1, 1], output: [1] },
                  { input: [2, 2], output: [2] },
                  { input: [3, 3], output: [3] },
                  { input: [4, 4], output: [4] },
                  { input: [5, 5], output: [5] },
                  { input: [6, 6], output: [6] },
                  { input: [7, 7], output: [7] },
                  { input: [8, 8], output: [8] },
                  { input: [9, 9], output: [9] }
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
                defaultValue="[20, 10, 5]"
              />
            </FormGroup>
            <FormGroup>
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
          <Button onClick={this.reCreateBrain}>Начать</Button>
        </Card>
      </CardDeck>
    );
  }
}

Panel.propTypes = {
  reCreateBrain: PropTypes.func.isRequired
};
