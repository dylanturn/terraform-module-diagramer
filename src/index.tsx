import React from 'react';
import ReactDOM from 'react-dom/client';
import 'beautiful-react-diagrams/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { UncontrolledDiagram } from './diagram';
import { ModuleDiagram } from './module-diagram';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Container fluid>
      <Row>
        <Col md="8">
          <ModuleDiagram />
        </Col>
        <Col md="4">
          <UncontrolledDiagram />
        </Col>
      </Row>
    </Container>
    
  </React.StrictMode>
);