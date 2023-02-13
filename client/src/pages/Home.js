import React, { useEffect, useState } from "react";

import Filter from "../components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import ContentData from "../components/ContentData";
import NavbarProject from "../components/NavbarProject";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Home(props) {
  let { data: houses } = useQuery("housesCache", async () => {
    const response = await API.get("/houses");
    return response.data.data;
  });

  const [house, setHouse] = useState();

  const [filter, setFilter] = useState({
    name: "",
    price: "",
    type_rent: "",
    bedroom: "",
    bathroom: "",
    amenities: [],
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const filteredHouses = houses.filter((house) => {
      return (
        (filter.price === "" || house.price < parseInt(filter.price)) &&
        (filter.name === "" || house.name === filter.name) &&
        (filter.type_rent === "" || house.type_rent === filter.type_rent) &&
        (filter.bedroom === "" || house.bedroom === parseInt(filter.bedroom)) &&
        (filter.bathroom === "" || house.bathroom === parseInt(filter.bathroom)) &&
        (filter.amenities.length === 0 || filter.amenities.every((amenity) => house.amenities.includes(amenity)))
      );
    });
    setHouse(filteredHouses);
    console.log(house);
  };

  return (
    <>
      <NavbarProject filter={filter} setFilter={setFilter} handleOnSubmit={handleOnSubmit} />
      <Row className="po">
        <Filter filter={filter} setFilter={setFilter} handleOnSubmit={handleOnSubmit} />
        <ContentData house={house} />
      </Row>
    </>
  );
}
