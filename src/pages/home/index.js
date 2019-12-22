import React, { useEffect } from "react";
import "./styles.css";
import Header from "../../components/header";
import { NavLeft } from "../../components/nav";
import { ChartMultiline, ChartPie } from "../../components/charts";
import { Card, Row } from "react-bootstrap";

function Home() {
  useEffect(() => {
    let dataSet = {
      sm: [24, 42, 54, 26, 35],
      md: [16, 52, 34, 58, 44],
      lg: [11, 24, 42, 35, 64]
    };
    ChartMultiline(dataSet, [1, 6]);
    ChartPie(["1500", 1000]);
  }, []);

  return (
    <>
      <Header></Header>
      <section className="row">
        <NavLeft></NavLeft>
        <article className="col-10 mt-4" id="main-article">
          <Row className="m-0">
            <div className="col-12 col-md-6 mb-4">
              <Card className="bg-theme2 p-2">
                <canvas id="chartMultiline"></canvas>
              </Card>
            </div>
            <div className="col-12 col-md-6">
              <Card className="bg-theme2 p-2">
                <canvas id="chartPie"></canvas>
              </Card>
            </div>
          </Row>
        </article>
      </section>
    </>
  );
}

export default Home;
