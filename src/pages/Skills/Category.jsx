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

const Category = () => {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [viewLoader, setViewLoader] = useState(false);

  const navigate = useNavigate();

  // const EditCategory = (id) => {
  //   console.log("Id", id);
  // };

  const addCategory = async (e) => {
    e.preventDefault();
    setViewLoader(true);

    let categoryData = {
      name: name,
    };
    if(categoryData.name == ""){
      toast.error('please fill skill field')
      console.log("Skills field can not be blank")
    }
    else {
      let result = await HttpClient.requestData(
        "category",
        "POST",
        categoryData
      );
      // console.log("Result", result);

      if (result && result.status) {
        setViewLoader(false);
        toast.success(result.message);
        // let file = document.querySelector("#images");
        // file.value = "";
        setName("");
        // fetchCategoryData()
      } else {
        setViewLoader(false);
        toast.error(result.message);
      }
    }
  };

  return (
    <>
      {viewLoader ? <Loader /> : null}
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Add Skills" />
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1" style={{ marginBottom: "12px" }}>
              Skills
            </label>
            <input
              type="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Skills"
            />
          </div>
          <button
            class="btn btn-primary mt-4"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={(e) => addCategory(e)}
          >
            Add Skills
          </button>
        </form>
      </div>
    </>
  );
};

export default Category;
