import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

export function Wrapper({ children }) {
  return (
    <Container className="vh-100">
      <Row className="d-flex flex-column justify-content-center  h-100">
        <Col md="6" lg="5" className="m-auto">
          <Card className="p-2 ">
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export const ErrorMessageView = ({ message }) => (
  <p className="font-weight-lighter font-italic font-smaller text-danger">
    {message}
  </p>
);
