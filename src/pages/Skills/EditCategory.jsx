import React, { useState } from "react";
import { Header } from "../../components";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import HttpClient from "../../components/HttpClient";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, styled, Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,padding-bottom: 12px;
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background-color: rgb(3, 201, 215);
  height: 48px;
  border-radius: 2px;
`;

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [id, setId] = useState("");
  const [viewLoader, setViewLoader] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/edit-category") {
      console.log("DATA", location.state);
      setCategoryName(location.state?.catName);
      setId(location.state?._id);
    }
  }, []);


  const editCategory = async (e) => {
    e.preventDefault();
    setViewLoader(true);
    let categoryData = {
      name: categoryName,
    };
    let endPoint = `category/${id}`;
    console.log("EditCategory ", categoryData);
    
    if (categoryName) {
      let result = await HttpClient.requestData(endPoint, "PUT", categoryData);
      console.log("ResultEdit", result);
      if (result && result.status) {
        setViewLoader(false);
        toast.success(result.message);
        setCategoryName("");
        navigate("/manage-category")
      } else {
        toast.error(result.message);
        setViewLoader(false);
      }
    } else {
      setViewLoader(false);
      toast.error("All Fields Are Required");
    }
  };


  return (
    <>
      {" "}
      {viewLoader ? <Loader /> : null}
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Skills Category" />
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1" style={{ marginBottom: "12px" }}>
              Skills Category Name
            </label>
            <input
              type="email"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Skills Category Name"
            />
          </div>
          <button
            class="btn btn-primary mt-4"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={editCategory}
          >
            Edit Skills Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
