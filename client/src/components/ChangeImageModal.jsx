import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UserContext } from "../context/userContext";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function ChangeImageModal(props) {
  const [preview, setPreview] = useState();

  const [state, dispatch] = useContext(UserContext);
  const id = state.user.id;
  const [form, setForm] = useState({
    image: "",
  });

  // let { data: userId } = useQuery("userCache", async () => {
  //   const response = await API.get("/user/" + id);
  //   return response.data.data;
  // });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0]);

      // Insert product data
      const response = await API.patch("/change-image", formData);
      console.log(response.data);

      alert("successfully change your image!");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      {/* {preview && <img className="preview" src={preview} alt="Preview" />} */}
      <Modal.Body className="d-flex flex-column align-items-center">
        {preview && (
          <div>
            <img src={preview} className="shadow rounded mb-3" style={{ width: "310px", height: "430px", objectFit: "cover" }} alt={preview} />
          </div>
        )}
        <Form className="w-75 d-flex gap-2 flex-column" onSubmit={(e) => handleSubmit.mutate(e)}>
          <input type="file" id="upload" name="image" hidden onChange={handleChange} />
          <label htmlFor="upload" className="bg-primary w-100 text-center p-2 rounded text-white">
            Upload file
          </label>

          <Button className="w-100" type="submit">
            save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// function App() {

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
//     </>
//   );
// }

// render(<App />);
