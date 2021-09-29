import React from "react";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
import Plot from "react-plotly.js";

// CSS Styles
const Container = styled.div`
  .hashtag {
    width: 40%;
  }
  .first {
    background-color: rgba(22, 216, 152, 0.4);
    height: 90px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #00a26d;
  }

  .second {
    background-color: #16d898;
    text-align: right;
    height: 50px;
    color: #fff;
  }
`;

export const TrendingByHashTag = () => {
  const trace1 = {
    x: [
      "giraffes",
      "orangutans",
      "monkeys",
      "sadrack",
      "test",
      "fskfjs",
      "kork",
      "kkfs",
      "ojfjsj",
    ],
    y: [20, 14, 23, 45, 85, 49, 45, 40, 40],
    name: "SF Zoo",
    type: "bar",
    marker: {
      color: "#16D898",
    },
  };
  const trace2 = {
    x: [
      "giraffes",
      "orangutans",
      "monkeys",
      "sadrack",
      "test",
      "fskfjs",
      "kork",
      "kkfs",
      "ojfjsj",
    ],
    y: [12, 18, 29, 30, 12, 35, 90, 203, 40],
    name: "LA Zoo",
    type: "bar",
    marker: {
      color: "rgba(22, 216, 152, 0.4)",
    },
  };
  const data = [trace1, trace2];
  const layout = {
    barmode: "stack",
    showlegend: false,
    // autosize: true,
    xaxis: {
      showgrid: false,
      visible: false,
    },
    yaxis: {
      visible: false,
    },
  };

  return (
    <Container>
      <Row>
        <Col lg={5}>
          <div className="hashtag">
            <Row className="first">
              <p>#TheBachelor</p>
              <p>52k</p>
            </Row>
            <Row className="second">
              <Col>
                <p>8.3k</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={7}>
          <Plot data={data} layout={layout} />
        </Col>
      </Row>
    </Container>
  );
};

export default TrendingByHashTag;
