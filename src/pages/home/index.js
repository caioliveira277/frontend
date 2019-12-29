import React, { useEffect } from "react";
import "./styles.css";
import Header from "../../components/header";
import { NavLeft } from "../../components/nav";
import { ChartMultiline, ChartPie } from "../../components/chart";
import CarouselMenu from "./menu";
import { Card, Row } from "react-bootstrap";

import { dataChart, dataMenu } from "../../tests";

function Home() {
  useEffect(() => {
    ChartMultiline(dataChart, [0, 6]);
    ChartPie(["1500", 1000]);
  }, []);

  return (
    <>
      <Header></Header>
      <section className="row">
        <NavLeft></NavLeft>
        <article className="col-10" id="main-article">
          <Row className="m-0 mt-3">
            <div className="col-12 col-md-6 mb-4">
              <Card className="bg-theme2 p-2">
                <canvas id="chartMultiline"></canvas>
              </Card>
            </div>
            <div className="col-12 col-md-6 mb-4">
              <Card className="bg-theme2 p-2">
                <canvas id="chartPie"></canvas>
              </Card>
            </div>
            <div className="col-12 col-md-12 mb-2">
              <Card className="bg-theme2 p-2">
                <CarouselMenu dataSet={dataMenu}/>
              </Card>
            </div>
          </Row>
        </article>
      </section>
    </>
  );
}

export default Home;
