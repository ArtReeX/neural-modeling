import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "reactstrap";

export default class Header extends PureComponent {
  render() {
    return (
      <div className="m-1">
        <hr className="my-1" />
        <Row>
          <Col sm="12" lg="9">
            <h1 className="display-5 text-white">Neural modeling</h1>
          </Col>
          <Col sm="12" lg="3">
            <Button
              color="danger"
              size="lg"
              block
              href="https://github.com/Arthur-Lazarenko/neural-modeling"
              target="_blank"
            >
              GitHub
            </Button>
          </Col>
        </Row>
        <p className="lead text-white">Моделирование нейронной активности.</p>
        <hr className="my-1" />
      </div>
    );
  }
}
