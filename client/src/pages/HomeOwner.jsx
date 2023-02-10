import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import NavbarProject from "../components/NavbarProject";
import magnifiyIc from "../assets/img/magnifiyIc.svg";
import { useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import NavbarWithoutSearch from "../components/NavbarWithoutSearch";

function HomeOwner(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  // Fetching product data from database
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(transactions);
  return (
    <>
      <NavbarWithoutSearch />
      <Container style={{ marginTop: "200px" }}>
        <h1>Incoming Transaction</h1>
        <Table className="" striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Type of Rent</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((e, i) => {
              return (
                <tr key={i}>
                  <td className="py-3">{i + 1}</td>
                  <td className="py-3">{e.user.fullname}</td>
                  <td className="py-3">{e.house.type_rent}</td>
                  <td className={e.status_payment === "success" ? "text-success" : e.status_payment === "Pending" ? "text-warning" : "text-danger"}>{e.status_payment}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default HomeOwner;
