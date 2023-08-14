import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";

const AddApplicant = () => {
  const [clientData, setClientData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    currlocation: "",
    profile: "",
  });

  const [hide, setHide] = useState(false);

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    console.log("ApplicantCategoryData", result.data);
    if (result && result.status) {
      setClientData((prevData) => ({
        ...prevData,
        category: result.data,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  // submit clientData
  const handleClientSubmit = async (e) => {
    e.preventDefault();
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
        profile: "",
      });
    } else {
      toast.error("Client Added Failed");
      console.log("Client Added Failed");
    }
  };

  // upload resume
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", clientData.resume);
    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if (result && result.status) {
        clientData.resume = result.data;
        toast.success("Resume Upload Successfully");
      } else {
        toast.error("Resume Can not be uploaded");
      }
    } catch (error) {
      console.log("Error uploading resume", error.message);
    }
  };

  return (
    <div className="flex flex-col h-auto w-full justify-center items-center p-2">
      <h1>Add Client</h1>
      <form action="" className="p-4 rounded w-[45rem] bg-gray-200">
        {/* first name */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter First Name</label>
            <br />
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
              className="bg-white w-[41rem] pl-4 text-black"
            />
          </div>
        </div>
        {/* last name */}
        <div className="flex justify-between">
          <div className="">
            <label htmlFor="">Enter Last Name</label>
            <br />
            <input
              type="text"
              value={clientData.lastname}
              onChange={(e) =>
                setClientData({ ...clientData, lastname: e.target.value })
              }
              placeholder="Last name"
              className="bg-white w-[41rem] text-black"
            />
          </div>
        </div>
        {/* gmail */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Email</label>
            <br />
            <input
              type="email"
              value={clientData.email}
              onChange={(e) =>
                setClientData({ ...clientData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[41rem] text-black"
            />
          </div>
        </div>
        {/* mobile */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Phone </label>
            <br />
            <input
              type="Phone"
              value={clientData.phone}
              onChange={(e) =>
                setClientData({ ...clientData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[41rem] text-black"
            />
          </div>
        </div>

        {/* location*/}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Current Location</label>
            <br />
            <input
              type="text"
              value={clientData.currlocation}
              placeholder="Current Location"
              className="bg-white w-[41rem] text-black"
              onChange={(e) =>
                setClientData({ ...clientData, currlocation: e.target.value })
              }
            />
          </div>
        </div>
        {/* Resume */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Browse Resume</label>
            <br />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-white text-black h-12 w-[32rem] rounded"
              onChange={(e) =>
                setClientData({
                  ...clientData,
                  resume: e.target.files[0],
                })
              }
            />
            <button
              className="bg-white text-black border border-2 rounded h-12"
              onClick={handleResumeUpload}
            >
              Upload Resume
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
