import React, { useState } from "react";
import { Header } from "../../components";
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
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
const EditSubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryData, setCategorydata] = useState([]);
  // const [category , setCategory] = useState('')
  const [categoryId, setCategoryId] = useState("");
  // const [preview , setPreview] = useState('');
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const imageHandler = async (e) => {
    let file = e.target.files[0];
    let data = new FormData();
    data.append("image", file);
    let result = await HttpClient.fileUplode(
      "upload-Sub-Cat-image",
      "POST",
      data
    );
    console.log("IMAGE", result);

    if (result && result.status) {
      toast.success("Image upload Successfully");
      setImage(result.image);
    } else {
      console.log("Failed to upload image!");
    }
  };

  useEffect(() => {
    fetchCategoryData();

    if (location.pathname === "/edit-sub-category") {
      setSubCategoryName(location?.state?.subcatName);
      setCategoryId(location?.state?.categoryID);
      setId(location?.state?._id);
    }
  }, []);

  const editsubCategory = async (e) => {
    e.preventDefault();

    let data = {
      name: subCategoryName,
    };
    console.log("SubCategoryData", data);

    let endpoint = `subcategory/${id}`;

    if(data.name == ""){
      toast.message("Please Fill Skills Sub category name")
    }

    if (data.name !== "") {
      let result = await HttpClient.requestData(endpoint, "PUT", data);
      console.log("EditResult", result);

      if (result && result.status) {
        toast.success(result.message);
        setCategoryId("");
        setSubCategoryName("");
        navigate("/manage-sub-category")
        // setImage("");
        // let file = document.querySelector("#images");
        // file.value = "";
      } else {
        toast.error("Failed to add subCategory data");
      }
    } else {
      toast.error("All Fields Are Required");
    }
  };

  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("subcategory", "GET");
    console.log("CategoryData", result);
    if (result && result.status) {
      setCategorydata(result?.data);
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  const handleCategoryId = (e) => {
    setCategoryId(e.target.value);
    // setShow(true)
  };

  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex flex-col items-center">
        <Header title="Edit Sub Skills " />

        <form className="h-[20rem] w-[35rem] bg-gray-100 border border-2 border-black rounded flex justify-center items-center ">
          <div class="">
            <label
              for="exampleInputEmail1"
              style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "bold", marginLeft: "3.5rem" }}
            >
            Sub Skills Name :
            </label><br />
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="bg-white text-black border border-solid border-black"
              placeholder="Enter Sub Skills Name"
            />
          </div>
          <button
            class="btn btn-primary mt-4 w-24"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={editsubCategory}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSubCategory;
