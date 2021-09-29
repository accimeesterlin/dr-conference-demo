import React from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import { Container, Row, Col } from "react-bootstrap";
// import { Footer } from "./footer";

const BackgroundColor = styled.div`
  background-color: #f2f2f2;
`;

export const Layout = ({ children }) => (
  <BackgroundColor>
    <Container className="px-4">
      <Row className="mb-2">
        <Col>
          <h3 className="h4">Welcome back</h3>
        </Col>
        <Col xs="auto" className="ml-auto">
          <NextLink href="/account/teams">
            <a>My Teams</a>
          </NextLink>
          <NextLink href="/account">
            <a className="ml-4">My account</a>
          </NextLink>
        </Col>
      </Row>
      {/* <span className="spacer42" aria-hidden="true" /> */}
      {children}
      {/* <Footer /> */}
    </Container>
  </BackgroundColor>
);
