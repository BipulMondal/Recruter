import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { useParams, useNavigate } from "react-router-dom";

const EditClient = () => {
  const [clientData, setClientData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    currlocation: "",
    profile: "",
  });

  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  console.log("ClientparamsId", params.id)

  //fetch client data
  const fetchClientData = async () => {
    let result = await HttpClient.requestData("client", "GET");
    console.log("ClientData", result.data);

    if (result && result.status) {
        const filterData = result.data.filter(client => client._id === params.id)
        console.log("filterData", filterData[0])

        if(filterData){
            setClientData(filterData[0])
        }
    } else {
      toast.error("Error to fetch Category Data");
    }
  };


  // submit Updated Client data
  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = {
      firstname: clientData.firstname,
      lastname: clientData.lastname,
      email: clientData.email,
      mobile: clientData.mobile,
      currlocation: clientData.currlocation,
      profile: clientData.resume,
    };

    console.log(data);
    let result = await HttpClient.requestData(`client/${params.id}`, "PUT", data);

    if(result && result.status){
      toast.success("Client updated Successfully")
      console.log("Client updated Successfully")
      navigate("/manage-client")
    }
    else{
      toast.error("Client updated failed")
      console.log("Client updated failed")
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
      if(result && result.status) {
          clientData.resume = result.data;
          toast.success("Resume Upload Successfully")
      }
      else{
        toast.error("Resume Can not be uploaded")
      }
    } catch (error) {
      console.log("Error uploading resume", error.message);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <div className="flex h-auto w-full justify-center p-2">
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
              value={clientData.mobile}
              onChange={(e) =>
                setClientData({ ...clientData, mobile: e.target.value })
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
                  profile: e.target.files[0],
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
          <button className="rounded-xl mt-4 w-20" onClick={handleUpdate}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
