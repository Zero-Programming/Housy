import React, { useContext, useEffect } from "react";
import NavbarProject from "../components/NavbarProject";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Icon from "../components/Icon.svg";
import Elipse from "../assets/img/Ellipse 7.png";
import Elipsee from "../assets/img/Ellipse 8.png";
import Line from "../assets/img/Line 9.png";
import CodeQr from "../assets/img/qr-code.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Moment from "react-moment";
import NavbarWithoutSearch from "../components/NavbarWithoutSearch";
import { convert } from "rupiah-format";

export default function InvoiceOwner(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  // Fetching product data from database
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <NavbarWithoutSearch userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} />;
      {transactions?.map((value, index) => {
        return (
          <Container className="myc fmb" style={{ width: "60%", marginTop: "200px" }}>
              <div className="border border-3 p-4 pe-0 pb-0">
                <Row className="d-flex jcb">
                  <Col className="" md="auto" lg={4}>
                    <img src={Icon} alt="" />
                  </Col>
                  <Col className="" md="auto" lg={4}>
                    <h2 className="text-center p-0 m-0 fw-bold">Booking</h2>
                    <p className="text-center p-0 m-0">
                      <Moment format="dddd" className="fw-bold">
                        {value.created_at}
                      </Moment>
                      , <Moment format="D MMM YYYY">{value.created_at}</Moment>
                    </p>
                  </Col>
                </Row>
                <Row style={{}} className="d-flex jcb align-items-center pb-3">
                  <Col className="" md="auto" lg={4}>
                    <h5 className="fw-bold">{value.house.name}</h5>
                    <p>{value.house.address}</p>
                    <p
                      className={
                        value.status_payment === "success"
                          ? "text-success bg-success w-50 text-center p-1 bg-opacity-10 text-success"
                          : value.status_payment === "Pending"
                          ? "text-warning bg-warning w-50 text-center p-1 bg-opacity-10 text-warning"
                          : "text-danger bg-danger w-50 text-center p-1 bg-opacity-10 text-danger"
                      }
                    >
                      {value.status_payment}
                    </p>
                  </Col>
                  <Col className="" md="auto" lg={4}>
                    <div className="d-flex flex-column ">
                      <div className="d-flex  align-items-center gap-4">
                        <div>
                          <img src={Elipse} alt="" />
                        </div>
                        <div className="d-flex flex-column">
                          <span>Check-in</span>
                          <span>
                            <Moment format="DD MMM YYYY">{value.check_in}</Moment>
                          </span>
                        </div>
                        <div className="ms-3 d-flex flex-column">
                          <span>Amenities</span>
                          <span>{value.house.amenities}</span>
                        </div>
                      </div>

                      <div className="d-flex ">
                        <img style={{ marginLeft: "6px" }} src={Line} alt="" />
                      </div>
                      <div className="d-flex  align-items-center gap-4">
                        <div>
                          <img src={Elipsee} alt="" />
                        </div>

                        <div className="d-flex flex-column ">
                          <span>Check-Out</span>
                          <span>
                            <Moment format="DD MMM YYYY">{value.check_out}</Moment>
                          </span>
                        </div>
                        <div className="ms-3 d-flex flex-column ">
                          <span>Type of Rent</span>
                          <span>{value.house.type_rent}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="d-flex flex-column justify-content-center align-items-center gap-2" md="auto" lg={4}>
                    <img src={CodeQr} alt="" style={{ width: 150 }} />
                    {/* <Button type="submit" className="position-relative p-0 m-0 bg text-dark bd" variant="outline-primary"></Button> */}
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Row>
                    <Col className="d-flex" md="auto" lg={8}>
                      <Col className="d-flex align-items-center" md="auto" lg={1}>
                        <p className="m-0 py-2">No</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">Full Name</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">Gender</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">Phone</p>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="border border-start-0 border-end-0  ">
                    <Col className="d-flex" lg={8}>
                      <Col className="d-flex align-items-center" md="auto" lg={1}>
                        <p className="m-0">1</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">{value.user.fullname}</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">{value.user.gender}</p>
                      </Col>
                      <Col className="d-flex align-items-center" md="auto" lg={3}>
                        <p className="m-0">{value.user.phone}</p>
                      </Col>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <p className="ps-3 m-0">Long time rent</p>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <p className="m-0 py-2">
                        : <Moment duration={value.check_in} date={value.check_out} />
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col className="d-flex align-items-center" lg={2}>
                      <p className=" m-0 ps-3 py-2">Total</p>
                    </Col>
                    <Col className="d-flex align-items-center p-0" lg={2}>
                      <p className={value.status_payment === "success" ? "m-0 p-0 text-success fw-bold" : value.status_payment === "Pending" ? "m-0 p-0 text-warning fw-bold" : "m-0 p-0 text-danger fw-bold"}>
                        : {convert(value.house.price)}
                      </p>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Container>
        );
      })}
    </>
  );
}
