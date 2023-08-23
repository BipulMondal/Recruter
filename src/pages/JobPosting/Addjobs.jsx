import React, { useEffect } from "react";
import { Header } from "../../components";
import { useState } from "react";
import HttpClient from "../../components/HttpClient";
import toast from "react-hot-toast";
import { GiFlowerStar } from "react-icons/gi";

const Addjobs = () => {
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

  const [clientData, setClientData] = useState([]);
  const [hide, setHide] = useState(false);

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    console.log("ApplicantCategoryData", result.data);
    if (result && result.status) {
      const filterSkills = result.data.filter((item) => item.status === true);
      setJobData((prevData) => ({
        ...prevData,
        category: filterSkills,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  console.log("jobdata", jobData);

  //   fetch subcategory data
  const fetchSubCategoryData = async (categoryId) => {
    let result = await HttpClient.requestData(
      `subcategoryBycat/${categoryId}`,
      "GET"
    );

    if (result && result.status) {
      const filterSkills = result.data.filter((item) => item.status === true);
      try {
        setJobData((prevData) => ({
          ...prevData,
          subcategory: filterSkills,
        }));
        console.log("subcategory data", filterSkills);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //  fetch client data
  const fetchClientData = async () => {
    let result = await HttpClient.requestData("client", "GET");

    if (result && result.status) {
      const filterSkills = result.data.filter((item) => item.status === true);
      setClientData(filterSkills);
      console.log("Clientdata", result.data);
    } else {
      console.log("Client data Can not fetch");
    }
  };

  //handle category id
  const handleCategoryId = (e) => {
    const categoryId = e.target.value;
    const category = jobData.category.find((item) => item._id === categoryId);
    setHide(category === null);
    setSelectCategory(category);
    fetchSubCategoryData(categoryId);
    console.log("categoryId", categoryId);
  };

  // handle subcategory id
  const handleSubCategoryId = (e) => {
    const subCategoryId = e.target.value;
    const subCategory = jobData.subcategory.find(
      (item) => item._id === subCategoryId
    );
    setHide(subCategory === null);
    setSelectSubCategory(subCategory);

    console.log("subCategoryId", subCategoryId);
  };

  const handleClientId = (e) => {
    const clientId = e.target.value;
    const client = clientData.find((client) => client._id === clientId);
    setHide(client === null);
    setSelectClient(client);
    console.log("clientId", clientId);
  };

  useEffect(() => {
    fetchCategoryData();
    fetchSubCategoryData();
    fetchClientData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (
      !jobData.title ||
      !jobData.location ||
      !jobData.rate ||
      !jobData.roles ||
      !jobData.requiements ||
      !jobData.jobStatus
    ) {
      alert(" * field are required ");
    } else {
      let data = {
        title: jobData.title,
        location: jobData.location,
        rate: jobData.rate,
        roles: jobData.roles,
        requiements: jobData.requiements,
        jobStatus: jobData.jobStatus,
        categoryid: selectCategory ? selectCategory._id : null,
        subcategoryid: selectSubCategory ? selectSubCategory._id : null,
        client: selectClient ? selectClient._id : null,
      };

      console.log(data);

      let result = await HttpClient.requestData("job", "POST", data);
      console.log("job post", result);

      if (result && result.status) {
        toast.success(result?.message);
        setJobData({});
      } else {
        toast.error(result?.message);
      }
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl flex flex-col items-center">
        <Header title="Add Job post" />
        <form
          action=""
          className="p-4 rounded w-[39rem] bg-gray-100 border border-2 border-black"
        >
          {/* job title */}
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <label htmlFor="">Enter Job Title</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
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
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* location */}
          <div className="flex justify-between">
            <div className="">
              <div className="flex">
                <label htmlFor="">Enter Location</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
              <input
                type="text"
                value={jobData.location}
                onChange={(e) =>
                  setJobData({ ...jobData, location: e.target.value })
                }
                placeholder="Enter Location"
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* rate */}
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <label htmlFor="">Enter Rate</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
              <input
                type="number"
                value={jobData.rate}
                onChange={(e) =>
                  setJobData({ ...jobData, rate: e.target.value })
                }
                placeholder="Enter rate"
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>
          {/* roles */}
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <label htmlFor="">Enter Roles</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
              <input
                type="text"
                value={jobData.roles}
                onChange={(e) =>
                  setJobData({ ...jobData, roles: e.target.value })
                }
                placeholder="Enter Roles"
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>

          {/* requirement*/}
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <label htmlFor="">Enter Requirement</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Requirements"
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
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
              <div className="flex">
                <label htmlFor="">Enter Job Status</label>
                <span>
                  <GiFlowerStar
                    style={{
                      marginTop: "20px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  />
                </span>
              </div>
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
                className="bg-white w-[36rem] pl-4 text-black border border-solid border-black"
              />
            </div>
          </div>

          {/* select skills */}
          <div>
            <div className="flex">
              <label htmlFor="">Select Skills</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <select
              name="category"
              id="category"
              className="bg-white w-[36rem] h-12 pl-4 rounded text-black border border-solid border-black"
              value={selectCategory ? selectCategory._id : ""}
              onChange={(e) => handleCategoryId(e)}
            >
              <option value={""}>Select a Skills</option>

              {Array.isArray(jobData.category) &&
                jobData.category.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/* select sub skills */}
          <div>
            <div className="flex">
              <label htmlFor="">Select Sub Skills</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <select
              name="category"
              id="category"
              className="bg-white w-[36rem] h-12 pl-4 rounded text-black border border-solid border-black"
              value={selectSubCategory ? selectSubCategory._id : ""}
              onChange={(e) => handleSubCategoryId(e)}
            >
              <option value={""}>Select Sub Skills</option>

              {Array.isArray(jobData.category) &&
                jobData.subcategory.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/* client */}
          <div>
            <div className="flex">
              <label htmlFor="">Select Client</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <select
              // name="client"
              // id="client"
              className="bg-white w-[36rem] h-12 rounded pl-4 text-black border border-solid border-black"
              value={selectClient ? selectClient._id : ""}
              onChange={(e) => handleClientId(e)}
            >
              <option value={""}>Select Client</option>
              {clientData.map((client, index) => (
                <option key={client._id} value={client._id}>
                  {client.firstname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              className="rounded-xl mt-4 w-20 font-bold bg-sky-500"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addjobs;
