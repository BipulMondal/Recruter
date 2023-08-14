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
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Skills Sub Category" />
        {/* <Wrapper>
            <label for="cars">Choose a category:</label>
  <select style={{height: '58px' , borderRadius:'5px'}} id="category" name="category" value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
    <option value={''}>Select a Category.......</option>
    {categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
    
  </select>
            <TextField type="text"  label="SubCategory Name" value={subCategoryName} variant="filled" onChange={(e) => setSubCategoryName(e.target.value)} />

          <TextField style={{paddingBottom: '11px'}} type="file" id="images" onChange={imageHandler}  variant="filled" />

          {image && <img style={{ height: '30%', width: '30%' , borderRadius:'9px' }} src={image} />}
          <LoginButton variant="contained" onClick={editsubCategory}>
            Edit SubCategory
          </LoginButton>
        </Wrapper> */}

        {/* <label style={{ marginBottom: "12px", fontSize: "15px" }} for="cars">
          Choose a Skills category :
        </label> */}
        {/* <select
          class="form-select"
          aria-label="select category"
          value={categoryId}
          onChange={(e) => handleCategoryId(e)}
        >
          <option value={""}>Select a Skills Category.......</option>
          {categoryData.map((item, index) => {
            return (
              <option id={item?._id} value={item?._id}>
                {item?.name}
              </option>
            );
          })}
        </select> */}

        <form>
          <div class="form-group">
            <label
              for="exampleInputEmail1"
              style={{ marginBottom: "12px", fontSize: "15px" }}
            >
             Skills Sub Category Name :
            </label>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Category Name"
            />
          </div>
          {/* <div class="mb-3">
            <label
              for="formFile"
              style={{ marginBottom: "12px", fontSize: "15px" }}
              class="form-label"
            >
              Upload Image :
            </label>
            <input
              id="images"
              onChange={imageHandler}
              class="form-control"
              type="file"
            />
            {image && (
              <img
                style={{
                  height: "30%",
                  width: "30%",
                  marginTop: "12px",
                  borderRadius: "9px",
                }}
                src={image}
              />
            )}
          </div> */}
          <button
            class="btn btn-primary mt-4"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={editsubCategory}
          >
            Edit Skills Sub Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSubCategory;
