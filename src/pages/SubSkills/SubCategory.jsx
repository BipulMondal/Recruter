import React, { useState } from "react";
import { Header } from "../../components";
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";

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

const SubCategory = () => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryData, setCategorydata] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [hide, setHide] = useState(true);


  const [show, setShow] = useState(false);


  const addsubCategory = async (e) => {
    e.preventDefault();

    let data = {
      name: subCategoryName,
      categoryid : categoryId
    };
    console.log("SubCategoryData", data);

    if(data.name == ""){
      toast.error("Please Fill Subcategory field")
    }

    if (data.name !== "") {
      let result = await HttpClient.requestData("subcategory", "POST", data);

      // console.log("Result", result);

      if (result && result.status) {
        toast.success(result.message);
        setCategoryId("");
        setSubCategoryName("");
        setShow(false);
        // let file = document.querySelector("#images");
        // file.value = "";
      } else {
        toast.error("Failed to add subCategory data");
      }
    } else {
      toast.error("All Fields Are Required");
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    console.log("CategoryData", result);
    if (result && result.status) {
      setCategorydata(result?.data);
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  const handleCategoryId = (e) => {
    {
      categoryId === "" ? setHide(false) : setHide(true);
    }
    setCategoryId(e.target.value);
  };

  return (
    <div className="w-full flex justify-center">
       <div className="m-2 md:m-10 p-2 md:p-10 bg-gray-100 rounded-3xl w-[40rem] flex flex-col items-center border-2 border-black">
        <Header title="Add Sub Skills" />
        
        <label style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "bold" }} for="cars">
          Choose a Skill:
        </label>
        <select
          class="w-[20rem] h-[3rem] rounded border-2 border-solid border-black bg-white"
          aria-label="select category"
          value={categoryId}
          onChange={(e) => handleCategoryId(e)}
        >
          <option value={""}>Select a Skills</option>
          {categoryData.map((item, index) => {
            return (
              <option id={item?._id} value={item?._id}>
                {item?.name}
              </option>
            );
          })}
        </select>
        <form className="flex justify-center">
          <div class="flex flex-col">
            <label
              for="exampleInputEmail1"
              style={{ marginBottom: "12px", marginLeft: "3.5rem", fontSize: "18px", fontWeight: "bold" }}
            >
              Sub Skill Name :
            </label>
            <input
              type="text"
              value={subCategoryName}
              disabled={hide}
              onChange={(e) => setSubCategoryName(e.target.value)}
              class="w-[20rem] h-[3rem] rounded border-2 border-solid border-black bg-white text-black"
              // id="exampleInputEmail1"
              // aria-describedby="emailHelp"
              placeholder="Enter Category Name"
            />
          </div>
          {/* <div class="mb-3">
  <label for="formFile" style={{marginBottom:'12px' , fontSize:'15px'}} class="form-label">Upload Image :</label>
  <input id="images" onChange={imageHandler} disabled={hide} class="form-control" type="file" />
  {image && <img style={{ height: "30%", width: "30%" , marginTop:'12px' , borderRadius:'9px' }} src={image} />}
</div> */}
          <button
            class="w-[11rem] rounded mt-4 ml-16"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={addsubCategory}
          >
            Add SubCategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubCategory;
