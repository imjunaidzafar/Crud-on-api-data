import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmial] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setAge(localStorage.getItem("age"));
    setEmial(localStorage.getItem("email"));
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`https://6492c232428c3d2035d0a162.mockapi.io/crud/${id}`, {
        e_name: name,
        e_age: age,
        e_email: email,
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4 my-3 ">
          <div className="mb2 mt-2 mb-3">
            <Link to="/">
              <button className="btn btn-primary">Read Data</button>
            </Link>
          </div>
          <div className="bg-primary p-4 text-center">
            <h1>Edit Data</h1>
          </div>
          <form onSubmit={handleEdit}>
            <div className="form-group  my-3">
              <label>Enter Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <label>Enter Age:</label>
              <input
                type="number"
                placeholder="Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <label>Enter Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmial(e.target.value)}
              />
            </div>
            <div className="d-grid my-3">
              <input type="submit" value="Update" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
