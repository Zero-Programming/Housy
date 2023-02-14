import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarProject from "../components/NavbarProject";
import Container from "react-bootstrap/esm/Container";
import bathimg from "../assets/img/bathimg.png";
import bedimg from "../assets/img/bedimg.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import MyBookingModal from "../components/MyBookingModal";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { convert } from "rupiah-format";
import NavbarWithoutSearch from "../components/NavbarWithoutSearch";

export default function DetailProperty() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const [modalSignIn, setModalSignIn] = React.useState(false);
  const [modalSignUp, setModalSignUp] = React.useState(false);

  const [modalShowBooking, setModalShowBooking] = React.useState(false);

  const handleSignin = () => {
    setModalSignIn(true);
  };
  const handleSignup = () => {
    setModalSignUp(true);
  };

  const { id } = useParams();

  let { data: detail } = useQuery("detailCache", async () => {
    const response = await API.get("/house/" + id);
    return response.data.data;
  });

  console.log(detail);
  return (
    <>
      <NavbarWithoutSearch />
      <Container style={{ margin: "200px" }} className="mx-auto px-5 mt-5 pt-5 d-flex flex-column">
        <Row>
          <Col className="mt-5">
            <div className="mb-4">
              <img className="w-100 rounded" style={{ height: "400px", objectFit: "cover" }} src={detail?.image} alt="" />
            </div>
            <div className="mb-5">
              <Row>
                <Col>
                  <img className="w-100" src={detail?.image} alt="" />
                </Col>
                <Col>
                  <img className="w-100" src={detail?.image} alt="" />
                </Col>
                <Col>
                  <img className="w-100" src={detail?.image} alt="" />
                </Col>
              </Row>
            </div>
            <div className="mb-5">
              <h1 className="fw-bold">{detail?.name}</h1>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <Col sm={4}>
                <h3 className="fw-bold">{convert(detail?.price) + " / " + detail?.type_rent}</h3>
                <p>{detail?.address}</p>
              </Col>
              <Col className="d-flex" sm={3}>
                <Col>
                  <p className="p-0 m-0">Bedrooms</p>
                  <div className="d-flex gap-2">
                    <span>{detail?.bedroom}</span>
                    <img src={bedimg} alt="" />
                  </div>
                </Col>
                <Col>
                  <p className="p-0 m-0">Bathrooms</p>
                  <div className="d-flex gap-2">
                    <span>{detail?.bathroom}</span>
                    <img src={bathimg} alt="" />
                  </div>
                </Col>
                <Col>
                  <p className="p-0 m-0">Area</p>
                  <div>
                    <span>{detail?.area}</span>
                  </div>
                </Col>
              </Col>
            </div>
            <div>
              <h4 className="fw-bold">Description</h4>
              <p style={{ textAlign: "justify" }}>{detail?.description}</p>
            </div>
            <div className="d-flex justify-content-md-end">
              {!localStorage.getItem("token") ? (
                <Button className=" mt-5 px-5" onClick={() => setModalSignIn(true)}>
                  Book Now
                </Button>
              ) : (
                <Button className=" mt-5 px-5" onClick={() => setModalShowBooking(true)}>
                  Book Now
                </Button>
              )}

              <MyBookingModal detail={detail && detail} show={modalShowBooking} onHide={() => setModalShowBooking(false)} />
            </div>
          </Col>
        </Row>
      </Container>

      <SignIn openSignup={handleSignup} show={modalSignIn} onHide={() => setModalSignIn(false)} />
      <SignUp openSignin={handleSignin} show={modalSignUp} onHide={() => setModalSignUp(false)} />
    </>
  );
}
