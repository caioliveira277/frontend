import React, { useEffect, useState } from "react";
import { ChartMultiline, ChartPie } from "../../components/chart";
import CarouselMenu from "../../components/menus";
import { Card, Row } from "react-bootstrap";
import { Get } from "../../services/api";
import { dataChart } from "../../tests";
import "./styles.css";

function Home() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    ChartMultiline(dataChart, [0, 6]);
    ChartPie(["1500", 1000]);
    Get("/menus", {weekly: true}).then(result => {
      setMenus(result.data);
      console.log(result);
    });
  }, []);

  return (
    <>
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
            <CarouselMenu data={menus} />
          </Card>
        </div>
      </Row>
    </>
  );
}

export default Home;
