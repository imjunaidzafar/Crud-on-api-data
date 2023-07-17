import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Read() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("loading", loading);
  const navigate = useNavigate();

  const getdata = () => {
    setLoading(true);
    axios
      .get("https://6492c232428c3d2035d0a162.mockapi.io/crud")
      .then((respose) => {
        setApiData(respose.data);
        setLoading(false);
      });
  };
  const setDataToStorage = (id, name, age, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://6492c232428c3d2035d0a162.mockapi.io/crud/${id}`)
      .then(() => {
        getdata();
      });
  };

  const goToCreate = () => {
    navigate("/create");
  };
  const goToEdit = () => {
    navigate("/edit/id");
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="mb2 mt-2 mb-3">
            <button className="btn btn-primary" onClick={goToCreate}>
              Add Data
            </button>
          </div>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {loading === true ? (
              <Loader />
            ) : (
              <tbody>
                {apiData.map((item) => {
                  return (
                    <>
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.e_name}</td>
                        <td>{item.e_age}</td>
                        <td>{item.e_email}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setDataToStorage(
                                item.id,
                                item.e_name,
                                item.e_age,
                                item.e_email
                              );
                              goToEdit();
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Read;
