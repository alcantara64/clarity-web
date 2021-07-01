import "./UserLayout.less";


import { Redirect, Route, Switch } from "react-router-dom";
// import { observer } from "mobx-react-lite";

import { userRouter } from "../Router/router.config";

import { ROUTES } from "../../constants/routes";
import { Container, Carousel } from "react-bootstrap";

import homeSlide1 from "../../images/home_slide_1.png";
import homeSlide2 from "../../images/home_slide_2.png";
import homeSlide3 from "../../images/home_slide_3.png";
import homeSlide4 from "../../images/home_slide_4.png";

const UserLayout = () => {
  return (
    <Container fluid id="app-user-layout">
      <>
        <div className="d-none d-md-block">
          <Carousel controls={false} className="carousel-container">
            <Carousel.Item>
              <img
                className="d-block carousel-image"
                src={homeSlide1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-header">Clarity</h3>
                <p className="carousel-description">
                  Manage every aspect of your healthcare right here. We’ll
                  connect to your insurance payers and providers. Then you can
                  view your health history and share it with trusted contacts.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carousel-image"
                src={homeSlide2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-header">Clarity</h3>
                <p className="carousel-description">
                  Manage every aspect of your healthcare right here. We’ll
                  connect to your insurance payers and providers. Then you can
                  view your health history and share it with trusted contacts.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carousel-image"
                src={homeSlide3}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-header">Clarity</h3>
                <p className="carousel-description">
                  Manage every aspect of your healthcare right here. We’ll
                  connect to your insurance payers and providers. Then you can
                  view your health history and share it with trusted contacts.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block  carousel-image"
                src={homeSlide4}
                alt="Fourth slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-header">Clarity</h3>
                <p className="carousel-description">
                  Manage every aspect of your healthcare right here. We’ll
                  connect to your insurance payers and providers. Then you can
                  view your health history and share it with trusted contacts.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="user-content">
          <Switch>
            {userRouter
              .filter((item) => !item.isLayout)
              .map((item: any, index) => (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}

            <Redirect from="/" to={`${ROUTES.oauth}`} />
          </Switch>
        </div>
      </>
    </Container>
  );
};

export default UserLayout;
