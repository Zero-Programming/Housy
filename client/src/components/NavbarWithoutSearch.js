import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./Icon.svg";
import "../styles/style.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DropdownLogin from "./Dropdown";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function NavbarWithoutSearch() {
  const [modalSignIn, setModalSignIn] = React.useState(false);
  const [modalSignUp, setModalSignUp] = React.useState(false);

  const handleSignup = () => {
    setModalSignUp(true);
  };

  const handleSignin = () => {
    setModalSignIn(true);
  };

  const [state, dispatch] = useContext(UserContext);

  const id = state.user.id;

  let { data: userId } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + id);
    return response.data.data;
  });

  return (
    <Navbar bg="white" expand="lg" className="fixed-top px-4">
      <Container fluid>
        <Navbar.Brand href={userId?.listAsRole == "Owner" ? "/home-owner" : "/"} style={{ marginRight: "31%" }}>
          <img src={logo} alt="" width={120} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {/* <InputGroup style={{ width: "300px" }}>
            <Form.Control type="search" placeholder="Search" className="bg" aria-label="Search" />
            <Button className="bg" variant="outline-secondary">
              <BsSearch />
            </Button>
          </InputGroup> */}

          <Nav style={{ maxHeight: "100px" }} className="my-2 my-lg-0 gap-3" navbarScroll>
            {!localStorage.getItem("token") ? (
              <>
                <Button className="shadow-sm bg" variant="light" onClick={() => setModalSignIn(true)}>
                  Sign In
                </Button>
                <Button className="shadow-sm bg" onClick={() => setModalSignUp(true)} variant="light">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <DropdownLogin />
              </>
            )}

            <SignIn openSignup={handleSignup} show={modalSignIn} onHide={() => setModalSignIn(false)} />
            <SignUp openSignin={handleSignin} show={modalSignUp} onHide={() => setModalSignUp(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWithoutSearch;
