import React, { useEffect } from "react";

import Filter from "../components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import ContentData from "../components/ContentData";
import NavbarProject from "../components/NavbarProject";

export default function Home(props) {
  // const [filters, setFilters] = useState({
  //   name: "",
  //   city_name: "",
  //   address: "",
  //   price: 0,
  //   type_rent: "",
  //   amenities: [],
  //   bedroom: 0,
  //   bathroom: 0,
  //   image: "",
  // });

  return (
    <>
      <NavbarProject />
      <Row className="po">
        <Filter />
        <ContentData />
      </Row>
    </>
  );
}
