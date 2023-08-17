import React, { useEffect } from "react";
import { Header } from "../../components";
import { useState } from "react";
import HttpClient from "../../components/HttpClient";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const EditJobs = () => {
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    rate: "",
    roles: "",
    requiements: "",
    jobStatus: "",
    categoryid: "",
    subcategoryid: "",
    clientid: "",
    category: [],
    subcategory: [],
    client: [],
  });
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const [selectClient, setSelectClient] = useState(null);

  const [skillsData, setSkillData] = useState([]);
  const [subSkillsData, setSubSkillsData] = useState([]);
  const [clientData, setClientData] = useState([]);

  const navigate = useNavigate();

  const params = useParams();

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    console.log("categorydata", result.data);
    if (result && result.status) {
      setSkillData(result.data);
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  //   fetch subcategory data
  const fetchSubCategoryData = async (categoryId) => {
    let result = await HttpClient.requestData(
      `subcategoryBycat/${categoryId}`,
      "GET"
    );

    if (result && result.status) {
      try {
        setSubSkillsData(result.data);
        console.log("subcategorydata", result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSubCategoryData(jobData.category);
  }, [jobData.category]);

  //  fetch client data
  const fetchClientData = async () => {
    let result = await HttpClient.requestData("client", "GET");

    if (result && result.status) {
      // setJobData((prevData) => ({
      //   ...prevData,
      //   client: result.data,
      // }));
      setClientData(result.data);
      console.log("Clientdata", result.data);
    } else {
      console.log("Client data Can not fetch");
    }
  };

  //handle category id
  const handleCategoryId = (e) => {
    const categoryId = e.target.value;
    const category = skillsData.find((item) => item._id === categoryId);
    // setHide(category === null);  // Check if this logic is hiding the dropdown as intended
    setSelectCategory(category);
    fetchSubCategoryData(categoryId);
    console.log("categoryId", categoryId);
  };

  // handle subcategory id
  const handleSubCategoryId = (e) => {
    const subCategoryId = e.target.value;
    const subCategory = subSkillsData.find(
      (item) => item._id === subCategoryId
    );
    // setHide(subCategory === null);
    setSelectSubCategory(subCategory);

    console.log("subCategoryId", subCategoryId);
  };

  const handleClientId = (e) => {
    const clientId = e.target.value;
    const client = clientData.find((client) => client._id === clientId);
    // setHide(client === null);
    setSelectClient(client);
    console.log("clientId", clientId);
  };

  const fetchJobData = async () => {
    let result = await HttpClient.requestData("job", "GET");

    if (result && result.status) {
      const filterData = result.data.filter((item) => item._id === params.id);
      console.log("filterData", filterData[0]);

      if (filterData) {
        setJobData({
          title: filterData[0]?.title,
          location: filterData[0]?.location,
          rate: filterData[0]?.rate,
          roles: filterData[0]?.roles,
          requiements: filterData[0]?.requiements,
          jobStatus: filterData[0]?.jobStatus,
          category: filterData[0]?.category_data[0]?._id,
          subcategory: filterData[0]?.subcategory_data[0]?._id,
          client: filterData[0]?.client_data[0]?._id,
        });
      }
    } else {
      toast.error("Error to fetch Consultant Data");
    }
  };

  console.log("jobdata_category", jobData);

  useEffect(() => {
    fetchJobData();
    fetchCategoryData();
    fetchClientData();
  }, []);

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    let data = {
      title: jobData.title,
      location: jobData.location,
      rate: jobData.rate,
      roles: jobData.roles,
      requiements: jobData.requiements,
      jobStatus: jobData.jobStatus,
      categoryid: selectCategory ? selectCategory._id : jobData.category,
      subcategoryid: selectSubCategory
        ? selectSubCategory._id
        : jobData.subcategory,
      client: selectClient ? selectClient._id : jobData.client,
    };

    console.log("data", data);

    let result = await HttpClient.requestData(`/job/${params.id}`, "PUT", data);
    console.log("job post", result);

    if (result && result.status) {
      toast.success(result?.message);
      navigate("/manage-jobs");
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex flex-col items-center">
        <Header title="Update Job post" />
        <form
          action=""
          className="p-4 rounded w-[40rem] bg-gray-100 border border-2 border-black"
        >
          {/* job title */}
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Enter Job Title</label>
              <br />
              <input
                type="text"
                value={jobData.title}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter Job Title"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* location */}
          <div className="flex justify-between">
            <div className="">
              <label htmlFor="">Enter Location</label>
              <br />
              <input
                type="text"
                value={jobData.location}
                onChange={(e) =>
                  setJobData({ ...jobData, location: e.target.value })
                }
                placeholder="Enter Location"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* rate */}
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Enter rate</label>
              <br />
              <input
                type="number"
                value={jobData.rate}
                onChange={(e) =>
                  setJobData({ ...jobData, rate: e.target.value })
                }
                placeholder="Enter rate"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* roles */}
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Enter Roles </label>
              <br />
              <input
                type="text"
                value={jobData.roles}
                onChange={(e) =>
                  setJobData({ ...jobData, roles: e.target.value })
                }
                placeholder="Enter Roles"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>

          {/* requirement*/}
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Enter Requirements</label>
              <br />
              <input
                type="text"
                placeholder="Enter Requirements"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
                value={jobData.requiements}
                onChange={(e) =>
                  setJobData({ ...jobData, requiements: e.target.value })
                }
              />
            </div>
          </div>

          {/* job status */}
          <div className="flex justify-between">
            <div>
              <label htmlFor="">Job Status</label>
              <br />
              <input
                type="text"
                value={jobData.jobStatus}
                onChange={(e) =>
                  setJobData({
                    ...jobData,
                    jobStatus: e.target.value,
                  })
                }
                placeholder="Job Status"
                className="bg-white w-[37rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>

          {/* select skills */}
          <div>
            <div className="flex justify-between">
              <label htmlFor="">Select Skills</label>
              <span>
                {/* <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} /> */}
              </span>
            </div>
            <select
              className="bg-white w-[37rem] h-12 rounded pl-4 text-black border border-solid border-black"
              value={selectCategory ? selectCategory._id : jobData.category}
              // value={jobData.category}
              onChange={(e) => handleCategoryId(e)}
            >
              <option value={""}>Select a Skills</option>

              {skillsData.map((item, index) => (
                <option
                  key={item._id}
                  value={item._id}
                  selected={item._id === jobData.category}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* select sub skills */}
          <div>
            <div className="flex justify-between">
              <label htmlFor="">Select Sub Skills</label>
              <span>
                {/* <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} /> */}
              </span>
            </div>
            <select
              className="bg-white w-[37rem] h-12 rounded pl-4 text-black border border-solid border-black"
              value={
                selectSubCategory ? selectSubCategory._id : jobData.subcategory
              }
              onChange={(e) => handleSubCategoryId(e)}
            >
              <option value={""}>Select Sub Skills</option>
              {subSkillsData.map((item, index) => (
                <option
                  key={item._id}
                  value={item._id}
                  selected={item._id === jobData.subcategory}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* client */}
          <div>
            <div className="flex justify-between">
              <label htmlFor="">Select Client</label>
            </div>
            <select
              className="bg-white w-[37rem] h-12 rounded pl-4 text-black border border-solid border-black"
              value={selectClient ? selectClient._id : jobData.client}
              onChange={(e) => handleClientId(e)}
            >
              <option value={""}>Select Client</option>

              {clientData.map((client, index) => (
                <option
                  key={client._id}
                  value={client._id}
                  selected={client._id === jobData.client}
                >
                  {client.firstname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              className="rounded-xl mt-4 w-20 bg-sky-600"
              onClick={handleUpdatePost}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditJobs;
