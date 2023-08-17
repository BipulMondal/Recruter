import React, { useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { GiFlowerStar } from "react-icons/gi";

const AddApplicant = () => {
  const [clientData, setClientData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    currlocation: "",
    profile: "",
  });


  // submit clientData
  const handleClientSubmit = async (e) => {
    e.preventDefault();

    if(
      !clientData.firstname ||
      !clientData.lastname ||
      !clientData.email ||
      !clientData.phone ||
      !clientData.currlocation 
    ){
      alert(" * fileds are required")
    }
    else{
      let data = {
        firstname: clientData.firstname,
        lastname: clientData.lastname,
        email: clientData.email,
        mobile: clientData.phone,
        currlocation: clientData.currlocation,
        profile: clientData.resume,
      };
  
      console.log(data);
      let result = await HttpClient.requestData("client", "POST", data);
  
      if (result && result.status) {
        toast.success("Client Added Successfully");
        console.log("Client Added Successfully");
  
        setClientData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          currlocation: "",
          profile: null,
        });
      } else {
        toast.error("Client Added Failed");
        console.log("Client Added Failed");
      }
    }
    
  };

  // upload resume
  const handleImageUpload = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", clientData.resume);

    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload image data", result);

      if (result && result.status) {
        clientData.resume = result.data;
        toast.success("image Upload Successfully");
      } else {
        toast.error("Image Can not be uploaded");
      }
    } catch (error) {
      console.log("Error uploading image", error.message);
    }
  };

  return (
    <div className="flex flex-col h-auto w-full justify-center items-center p-2">
      <h1>Add Client</h1>
      <form action="" className="p-4 rounded w-[45rem] bg-gray-100 border border-2 border-black">
        {/* first name */}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter First Name</label>
              <span>
                 <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "10px" }} />
              </span>
          </div>
            <input
              type="text"
              value={clientData.firstname}
              onChange={(e) =>
                setClientData({
                  ...clientData,
                  firstname: e.target.value,
                })
              }
              placeholder="First name"
              className="bg-white w-[41rem] pl-4 text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* last name */}
        <div className="flex justify-between">
          <div className="">
          <div className=" flex">
          <label htmlFor="">Enter Last Name</label>
              <span>
                 <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "10px" }} />
              </span>
          </div>
            <input
              type="text"
              value={clientData.lastname}
              onChange={(e) =>
                setClientData({ ...clientData, lastname: e.target.value })
              }
              placeholder="Last name"
              className="bg-white w-[41rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* gmail */}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter Email</label>
              <span>
                 <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "10px" }} />
              </span>
          </div>
            <input
              type="email"
              value={clientData.email}
              onChange={(e) =>
                setClientData({ ...clientData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[41rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* mobile */}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter Mobile</label>
              <span>
                 <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "10px" }} />
              </span>
          </div>
            <input
              type="Phone"
              value={clientData.phone}
              onChange={(e) =>
                setClientData({ ...clientData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[41rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* location*/}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter Location</label>
              <span>
                 <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "10px" }} />
              </span>
          </div>
            <input
              type="text"
              value={clientData.currlocation}
              placeholder="Current Location"
              className="bg-white w-[41rem] text-black border border-solid border-black"
              onChange={(e) =>
                setClientData({ ...clientData, currlocation: e.target.value })
              }
            />
          </div>
        </div>
        {/* image upload */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Browse Image</label>
            <br />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-white text-black h-12 w-[32rem] rounded border border-solid border-black" 
              onChange={(e) =>
                setClientData({
                  ...clientData,
                  resume: e.target.files[0],
                })
              }
            />
            <button
              className="bg-white text-black border border-2 rounded h-12"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="rounded-xl mt-4" onClick={handleClientSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplicant;
