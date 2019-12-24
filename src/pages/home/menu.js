import React from "react";
import "./styles.css";
import { Carousel, Row, Card, Badge } from "react-bootstrap";
import { dateNow } from "../../utils/utilities";

const CardElement = data => {
  const cardElement = [];
  const today = dateNow.getDate();
  for (let i = 0; i < data.length; i++) {
    let cardClass = "col-8 col-lg-3 text-dark";
    let badgeClass = "text-white";
    let publishAt = data[i].publishAt.split("/")[0];
    if (parseInt(publishAt) === today) {
      cardClass += " spotlight";
      badgeClass += " bg-theme1";
      data[i].publishAt = "Hoje";
    }
    cardElement.push(
      <Card className={cardClass} key={i}>
        <Badge pill variant="primary" className={badgeClass}>
          {data[i].publishAt}
        </Badge>
        {data[i].description}
      </Card>
    );
    if (i == 2) break;
  }
  return cardElement;
};
const CarouselItems = data => {
  const carouselElement = [];
  const loops = data.length / 3;
  let begin = 0, end = 3;
  for (let i = 0; i < loops; i++) {
    carouselElement.push(
      <Carousel.Item key={i}>
        <Carousel.Caption>
          <h5 className="mb-4">Cardápio Semanal</h5>
          <Row className="div-center">
            {CardElement(data.slice(begin, end))}
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
    );
    begin += 3;
    end += 3;
  }
  return carouselElement;
};

function CarouselMenu(dataSet) {
  return (
    <Carousel indicators={false} interval={null} touch={false}>
      {CarouselItems(dataSet["dataSet"])}
    </Carousel>
  );
}
export default CarouselMenu;
