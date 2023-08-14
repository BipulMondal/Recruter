import React, { useState } from 'react'
import { Header } from '../../components'
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import HttpClient from '../../components/HttpClient';
import { useLocation } from 'react-router-dom';

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
const EditSubSubCategory = () => {

    const [subSubCategoryName , setSubSubCategoryName]= useState('');
    const [categoryData , setCategorydata] = useState([]);
    const [subCategoryData , setSubCategoryData] = useState([])
    // const [category , setCategory] = useState('')
    const [categoryId , setCategoryId] = useState('');
    const [subCategoryId , setSubCategoryId] = useState('');
    // const [preview , setPreview] = useState('');
    const [image , setImage] = useState('');
    const [id , setId] = useState('');


    const [show , setShow] = useState(false);
    const [show1 , setShow1] = useState(false)

    const location = useLocation();

    const imageHandler = async (e) => {
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image",file);
        let result = await HttpClient.fileUplode("upload-Sub-Sub-Catimage", "POST", data);
        console.log("IMAGE", result);
    
        if (result && result.status) {
          toast.success("Image upload Successfully");
          setImage(result.image);
        } else {
          console.log("Failed to upload image!");
        }
    }

    useEffect(() => {
        fetchCategoryData();
        fetchSubCategoryData();
        console.log("Location", location.state);
        if(location.pathname === '/edit-sub-sub-category'){
            setCategoryId(location?.state?.categoryID);
            setSubCategoryId(location?.state?.subCategoryID);
            setSubSubCategoryName(location?.state?.subSubCatName);
            setImage(location?.state?.img);
            setId(location?.state?._id)
        }
    },[]);

    const fetchSubCategoryData = async () => {
        let result =await HttpClient.requestData("viewSubCategory" , "GET");
        console.log("SubCategoryData" , result);
        if(result && result.status){
            setSubCategoryData(result?.data);
        }else{
            toast.error("Failed to Fetch SubCategory Data")
        }
    }

    const editsubSubCategory = async(e) => {
      e.preventDefault();
        let data = {
            categoryID:categoryId,
            subCategoryID:subCategoryId,
            subSubCatName:subSubCategoryName,
            img:image
        }
        
        console.log("data" , data);
        let endpoint = `updateSubSubCategory/${id}`
        if(categoryId && subCategoryId && subSubCategoryName && image){
          let result = await HttpClient.requestData(endpoint, "PUT" , data);
          console.log("ResultSUBSUB" , result);
          if(result && result?.status){

            toast.success(result?.message);
            setCategoryId('');
            setSubCategoryId('');
            setSubSubCategoryName('');
            setImage('');
            let file = document.querySelector("#images");
            file.value = "";
          }else{
            toast.error("Failed to add subSubCategory data")
          }
        }else{
          toast.error("All Fields Are Required");
        }

    }

    const handleCategory = (e) => {
      setCategoryId(e.target.value);
      // {categoryId === "" ? setHide(false) : setHide(true)}
      setShow(true);
    }

    const handleSubCategory = (e) => {
      setSubCategoryId(e.target.value);
      // { subCategoryId === "" ? setHide1(false) : setHide1(true)}
      setShow1(true);
    }

    const fetchCategoryData = async() => {
      let result  = await HttpClient.requestData("viewCategory", "GET");
      console.log("CategoryData" , result);
      if(result && result.status){
        setCategorydata(result?.data);
      }else{
        toast.error('Error to fetch Category Data')
      }
    }
  return (
    <>
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Edit SubSubCategory" />
            {/* <Wrapper>
            <label for="cars">Choose a category:</label>
  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}}  name="category" value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
    <option value={''}>Select a Category.......</option>
    {categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
    
  </select>
  <select style={{height: '58px' , borderRadius:'5px'}}  name="suvcategory" value={subCategoryId} onChange={(e)=> setSubCategoryId(e.target.value)}>
    <option value={''}>Select a SubCategory.......</option>
    {subCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subcatName}</option>
      )
    })}
    
  </select>
            <TextField type="text"  label="SubSubCategory Name" value={subSubCategoryName} variant="filled" onChange={(e) => setSubSubCategoryName(e.target.value)} />

          <TextField style={{paddingBottom: '11px'}} type="file" id="images" onChange={imageHandler}  variant="filled" />

          {image && <img style={{ height: '30%', width: '30%' , borderRadius:'9px' }} src={image} />}
          <LoginButton variant="contained" onClick={editsubSubCategory}>
            Edit SubSubCategory
          </LoginButton>
        </Wrapper> */}



<label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a category :</label>
<select class="form-select" aria-label="select category" value={categoryId} onChange={(e)=> handleCategory(e)}>
<option value={''}>Select a Category.......</option>
{categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
</select>

{/* {
show ? <> */}
  <label style={{marginBottom:'12px' , fontSize:'15px'}} for="cars">Choose a sub category :</label>
<select class="form-select" aria-label="select category" value={subCategoryId} onChange={(e)=> handleSubCategory(e)}>
<option value={''}>Select a SubCategory.......</option>
    {subCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subcatName}</option>
      )
    })}
</select>

<form>
    <div class="form-group">
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Sub Sub Category Name :</label>
    <input type="text" value={subSubCategoryName} onChange={(e) => setSubSubCategoryName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter sub Sub Category Name"/>
  </div>
  <div class="mb-3">
  <label for="formFile" style={{marginBottom:'12px' , fontSize:'15px'}} class="form-label">Upload Image :</label>
  <input id="images" onChange={imageHandler} class="form-control" type="file" />
  {image && <img style={{ height: "30%", width: "30%" , marginTop:'12px' , borderRadius:'9px' }} src={image} />}
</div>
  <button  class="btn btn-primary" style={{backgroundColor:'rgb(3, 201, 215)'}} onClick={editsubSubCategory}>Edit subSubCategory</button>
  </form>


        </div>
   </>
  )
}

export default EditSubSubCategory