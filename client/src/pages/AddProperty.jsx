import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarProject from "../components/NavbarProject";
import Container from "react-bootstrap/esm/Container";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "bootstrap";
import { json, useNavigate } from "react-router-dom";
import NavbarWithoutSearch from "../components/NavbarWithoutSearch";

function AddProperty() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    image: "",
    nameProperty: "",
    city: "",
    address: "",
    price: "",
    typeOfRent: "",
    amenities: [],
    bedroom: "",
    bathroom: "",
    area: "",
    description: "",
  });
  console.log(form);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newAmenities = [...form.amenities];
      if (checked) {
        newAmenities.push(value);
      } else {
        newAmenities = newAmenities.filter((amen) => amen !== value);
      }
      setForm({ ...form, amenities: newAmenities });
    } else {
      setForm({ ...form, [name]: type === "file" ? e.target.files : e.target.value });
    }

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log("ini data productmu", form);
      const formData = new FormData();
      formData.append("image", form.image[0]);
      formData.append("name", form.nameProperty);
      formData.append("city_name", form.city);
      formData.append("address", form.address);
      formData.append("price", form.price);
      formData.append("amenities", JSON.stringify(form.amenities));
      formData.append("type_rent", form.typeOfRent);
      formData.append("bedroom", form.bedroom);
      formData.append("bathroom", form.bathroom);
      formData.append("description", form.description);
      formData.append("area", form.area);

      const response = await API.post("/house", formData);
      console.log("berhasil menambahkan product", response);

      navigate(`/home-owner`);
    } catch (err) {
      console.log("gagal upload product", err);
      console.log(form.amenities);
    }
  });

  return (
    <>
      <NavbarWithoutSearch />
      <Container className="w-75 mb-5" style={{ marginTop: "150px" }}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}
          <Form.Group controlId="upload" className="mb-3">
            <Form.Label className="fw-bold">Upload file</Form.Label>
            <Form.Control name="image" type="file" className="rs bgad" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nameProperty" onChange={handleChange}>
            <Form.Label className="fw-bold">Name Property</Form.Label>
            <Form.Control name="nameProperty" className="bgad" type="text" value={form.nameProperty} />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="address">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control onChange={handleChange} className="rs bgad" as="textarea" name="address" style={{ height: "80px" }} value={form.address} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Price">
            <Form.Label className="fw-bold">Price</Form.Label>
            <Form.Control onChange={handleChange} name="price" className="bgad" type="text" value={form.price} />
          </Form.Group>

          <Form.Label className="fw-bold">Amenities</Form.Label>
          <Form.Group className="mb-3 d-flex gap-5" controlId="amenities">
            <Form.Check onChange={handleChange} checked={form.amenities.includes("Furnished")} value="Furnished" type="checkbox" label="Furnished" />
            <Form.Check onChange={handleChange} checked={form.amenities.includes("Pet Allowed")} value="Pet Allowed" type="checkbox" label="Pet Allowed" />
            <Form.Check onChange={handleChange} checked={form.amenities.includes("Shared Accomodation")} value="Shared Accomodation" type="checkbox" label="Shared Accomodation" />
            {/* <Form.Check type="checkbox" label="Furnished" /> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Select onChange={handleChange} className="bgad" name="city" aria-label="Default select example">
              <option></option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="typeOfRent">
            <Form.Label className="fw-bold">Type of Rent</Form.Label>
            <Form.Select onChange={handleChange} className="bgad" name="typeOfRent" aria-label="Default select example">
              <option></option>
              <option value="Year">Year</option>
              <option value="Month">Month</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="bedroom">
            <Form.Label className="fw-bold">Bedroom</Form.Label>
            <Form.Select onChange={handleChange} className="bgad" name="bedroom" aria-label="Default select example">
              <option></option>
              <option value="3">3</option>
              <option value="2">2</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="bathroom">
            <Form.Label className="fw-bold">Bathroom</Form.Label>
            <Form.Select onChange={handleChange} className="bgad" name="bathroom" aria-label="Default select example">
              <option></option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="area">
            <Form.Label className="fw-bold">Area</Form.Label>
            <Form.Select onChange={handleChange} className="bgad" name="area" aria-label="Default select example">
              <option></option>
              <option value="1500 ft">1500 ft</option>
              <option value="1800 ft">1800 ft</option>
              <option value="2000 ft">2000 ft</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="description">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control onChange={handleChange} className="rs bgad" as="textarea" name="description" style={{ height: "80px" }} />
          </Form.Group>
          <div className="d-flex justify-content-center mt-5">
            <Button style={{ padding: "8px 100px" }} variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AddProperty;
