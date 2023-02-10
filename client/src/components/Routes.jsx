import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { useState } from "react";
import DetailProperty from "../pages/DetailProperty";
import Profile from "../pages/Profile.jsx";
import MyBooking from "../pages/MyBoking";
import Invoice from "../pages/Invoice";
import HomeOwner from "../pages/HomeOwner";
import AddProperty from "../pages/AddProperty";
import PrivateRoute from "./PrivateRoute";
import { API, setAuthToken } from "../config/api";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import InvoiceOwner from "../pages/invoiceOwner";
import MybookingHistory from "../pages/mybookinghistory";
import { useQuery } from "react-query";

export default function RoutesPage() {


  // console.log();

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      } else {
        if (state.user.listAsRole === "Owner") {
          navigate("/home-owner");
        }
      }
    }
    // Redirect Auth
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-property/:id" element={<DetailProperty book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-booking/:id" element={<MyBooking />} />
        <Route path="my-booking" element={<MybookingHistory />} />
        <Route path="/history/" element={<Invoice />} />
        <Route path="/home-owner" element={<HomeOwner />} />
        <Route element={<PrivateRoute />}>
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/history-owner" element={<InvoiceOwner />} />
        </Route>
      </Routes>
    </>
  );
}
