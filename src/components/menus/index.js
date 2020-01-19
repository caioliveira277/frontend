import React from "react";
import "./styles.css";
import { Carousel, Row, Card, Badge } from "react-bootstrap";
import { DateFormatDB } from "../../utils/utilities";

export default function CarouselMenu(data = []) {
  const CardElement = data => {
    const cardElement = [];
    for (let i = 0; i < data.length; i++) {
      cardElement.push(
        <Card className="col-8 col-lg-3 text-dark" key={i}>
          <Badge pill variant="primary" className="text-white">
            {DateFormatDB(data[i].dateOfPublication)}
          </Badge>
          {data[i].description}
        </Card>
      );
      if (i === 2) break;
    }
    return cardElement;
  };
  const CarouselItems = data => {
    const carouselElement = [];
    const loops = data.length / 3;
    let begin = 0,
      end = 3;
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

  return (
    <Carousel indicators={false} interval={null} touch={false}>
      {CarouselItems(data["data"])}
    </Carousel>
  );
}
