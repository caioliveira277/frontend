import React, { useEffect } from "react";
import "./styles.css";
import Header from "../../components/header";
import { NavLeft } from "../../components/nav";
import { ChartMultiline, ChartPie } from "../../components/chart";
import CarouselMenu from "./menu";
import { Card, Row } from "react-bootstrap";

function Home() {
  useEffect(() => {
    let dataSet = {
      sm: [24, 42, 54, 26, 35, 30],
      md: [16, 52, 34, 58, 44, 48],
      lg: [11, 24, 42, 35, 64, 54]
    };
    ChartMultiline(dataSet, [0, 6]);
    ChartPie(["1500", 1000]);
  }, []);

const dataSet = [
  {
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda perferendis molestias et sunt doloribus eos repudiandae
              aspernatur ea corrupti, excepturi fugiat voluptas eligendi
              molestiae amet ipsam iste voluptatum saepe qui. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Praesentium, odit dolorem?
              Voluptatibus nobis fuga laudantium molestiae exercitationem autem
              totam dolorem iusto magni, consequatur, doloribus reiciendis,
              itaque ad omnis maiores sequi.`,
    publishAt: "2019-12-22 15:19:09.700347-03"
  },
  {description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda perferendis molestias et sunt doloribus eos repudiandae
              aspernatur ea corrupti, excepturi fugiat voluptas eligendi
              molestiae amet ipsam iste voluptatum saepe qui. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Praesentium, odit dolorem?
              Voluptatibus nobis fuga laudantium molestiae exercitationem autem
              totam dolorem iusto magni, consequatur, doloribus reiciendis,
              itaque ad omnis maiores sequi.`,
    publishAt: "2019-12-23 15:19:09.700347-03"
  },{
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda perferendis molestias et sunt doloribus eos repudiandae
              aspernatur ea corrupti, excepturi fugiat voluptas eligendi
              molestiae amet ipsam iste voluptatum saepe qui. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Praesentium, odit dolorem?
              Voluptatibus nobis fuga laudantium molestiae exercitationem autem
              totam dolorem iusto magni, consequatur, doloribus reiciendis,
              itaque ad omnis maiores sequi.`,
    publishAt: "2019-12-24 15:19:09.700347-03"
  },{
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda perferendis molestias et sunt doloribus eos repudiandae
              aspernatur ea corrupti, excepturi fugiat voluptas eligendi
              molestiae amet ipsam iste voluptatum saepe qui. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Praesentium, odit dolorem?
              Voluptatibus nobis fuga laudantium molestiae exercitationem autem
              totam dolorem iusto magni, consequatur, doloribus reiciendis,
              itaque ad omnis maiores sequi.`,
    publishAt: "2019-12-25 15:19:09.700347-03"
  },
];




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
            <div className="col-12 col-md-6 mb-4">
              <Card className="bg-theme2 p-2">
                <canvas id="chartPie"></canvas>
              </Card>
            </div>
            <div className="col-12 col-md-12">
              <Card className="bg-theme2 p-2">
                <CarouselMenu dataSet={dataSet}/>
              </Card>
            </div>
          </Row>
        </article>
      </section>
    </>
  );
}

export default Home;
