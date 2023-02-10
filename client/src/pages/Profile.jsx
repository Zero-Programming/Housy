import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import imgp1 from "../assets/img/imgp1.png";
import imgp2 from "../assets/img/imgp2.png";
import imgp3 from "../assets/img/imgp3.png";
import imgp4 from "../assets/img/imgp4.png";
import imgp5 from "../assets/img/imgp5.png";
import imgp6 from "../assets/img/imgp6.png";
import imgp7 from "../assets/img/imgp7.png";
import Button from "react-bootstrap/esm/Button";
import ChangePassword from "../components/ChangePassword";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import NavbarWithoutSearch from "../components/NavbarWithoutSearch";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

export default function Profile(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const [state, dispatch] = useContext(UserContext);

  console.log(state.user.id);

  const id = state.user.id;

  let { data: userId } = useQuery("userCache", async () => {
    const response = await API.get("/user/"+id);
    return response.data.data;
  });

  console.log(userId)

  const [user, setUser] = useState([]); //Store all category data
  const [preview, setPreview] = useState(null); //For image preview

  // const handleFileUpload = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleSubmit = async event => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const res = await , {
  //     method: "POST",
  //     body: formData
  //   });

  //   const data = await res.json();
  //   console.log(data);
  // };


  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="">
      <NavbarWithoutSearch />
      <Container className="">
        <Row className="pp justify-content-between bg-white">
          <Col className="d-flex flex-column gap-4" sm={4}>
            <h3 className="fw-bold ">Personal Info</h3>
            <div className="d-flex align-items-center gap-3">
              <div>
                <img width={40} src={imgp3} alt="" />
              </div>
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.fullname}</span>
                <span className="fs14 text-secondary">Full Name</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={40} src={imgp2} alt="" />
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.email}</span>
                <span className="fs14 text-secondary">Email</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={40} src={imgp6} alt="" />
              <div className="d-flex flex-column">
                <Button onClick={() => setModalShow(true)} className="btn btn-dark bg-white text-primary fw-bold p-0 m-0 border-0">
                  Change Password
                </Button>
                <ChangePassword show={modalShow} onHide={() => setModalShow(false)} />
                <span className="p-0 m-0">Password</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={40} src={imgp7} alt="" />
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.listAsRole}</span>
                <span className="fs14 text-secondary">Status</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={40} src={imgp5} alt="" />
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.gender}</span>
                <span className="fs14 text-secondary">Gender</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={39} src={imgp1} alt="" />
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.phone}</span>
                <span className="fs14 text-secondary">Phone</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <img width={40} src={imgp4} alt="" />
              <div className="d-flex flex-column">
                <span className="p-0 m-0 fw-semibold">{state.user.address}</span>
                <span className="fs14 text-secondary">Address</span>
              </div>
            </div>
          </Col>
          <Col className="p-0 d-flex flex-column gap-3" sm={4}>
            <div>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                    }}
                    alt={preview}
                  />
                </div>
              )}
            </div>
            <div>
              <Button type="submit" className="w-100 text-dark bd bg">
                Change Foto Profile
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
