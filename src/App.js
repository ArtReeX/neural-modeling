import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <hr className="my-2" />
        <Row>
          <Col sm='10'><h1 className="display-5">Neural modeling</h1></Col>
          <Col sm='2'>
            <Button color="info" size="lg" block href="https://github.com/Arthur-Lazarenko/neural-modeling" target="_blank">
              GitHub
            </Button>
          </Col>
        </Row>
        <p className="lead">Моделирование нейронной активности.</p>
        <hr className="my-2" /> 
      </Container>
    );
  }
}

export default App;
