import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "reactstrap";

export default class Header extends PureComponent {
  render() {
    return (
      <div>
        <hr className="my-1" />
        <Row>
          <Col sm="12" lg="9">
            <h1 className="display-5">Neural modeling</h1>
          </Col>
          <Col sm="12" lg="3">
            <Button
              color="info"
              size="lg"
              block
              href="https://github.com/Arthur-Lazarenko/neural-modeling"
              target="_blank"
            >
              GitHub
            </Button>
          </Col>
        </Row>
        <p className="lead">Моделирование нейронной активности.</p>
        <hr className="my-1" />
      </div>
    );
  }
}
