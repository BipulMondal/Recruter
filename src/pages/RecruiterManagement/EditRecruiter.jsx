import React, { useState, useEffect } from "react";
// import { Header } from "../../components";
import HttpClient from "../../components/HttpClient";
// import DataTable from "react-data-table-component";
// import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditRecruiter = () => {
  const [recruiterData, setRecruiterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    gender: null,
    dob: "",
    qualification: "",
    experience: "",
    profile: null,
    summery: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  //   fetch recruiter data
  const fetchRecruiterdata = async () => {
    let result = await HttpClient.requestData("recruiter", "GET");

    if (result && result.status) {
      const filterData = result.data.filter(
        (recruiter) => recruiter._id === params.id
      );
      console.log("filterData", filterData[0]);

      if (filterData) {
        setRecruiterData(filterData[0]);
      }
    } else {
      toast.error("Error to fetch Consultant Data");
    }
  };

  useEffect(() => {
    fetchRecruiterdata();
  }, []);

  // date of birth
  const handleDobChange = (e) => {
    e.preventDefault();

    const date = e.target.value;
    // console.log(date);

    setRecruiterData({
      ...recruiterData,
      dob: e.target.value,
    });
  };

  // upload resume
  const handleImageUpload = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", recruiterData.profile);

    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if (result && result.status) {
        setRecruiterData({
          ...recruiterData,
          profile: result.data,
        });
        toast.success("Image Upload Successfully");
      } else {
        toast.error("Image Can not be uploaded");
      }
    } catch (error) {
      console.log("Error uploading Image", error.message);
    }
  };

  // submit Updated recruiterData
  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = {
      firstname: recruiterData.firstname,
      lastname: recruiterData.lastname,
      email: recruiterData.email,
      mobile: recruiterData.mobile,
      password: recruiterData.password,
      profile: recruiterData.profile,
      gender: recruiterData.gender,
      dob: recruiterData.dob,
      qualification: recruiterData.qualification,
      experience: recruiterData.experience,
      summery: recruiterData.summery,
    };

    console.log(data);

    let result = await HttpClient.requestData(
      `recruiter/${params.id}`,
      "PUT",
      data
    );

    if (result && result.status) {
      toast.success("Recruiter updated Successfully");
      console.log("Recruiter updated Successfully");
      navigate("/manage-recruiter");
    } else {
      toast.error("Recruiter updated failed");
      console.log("Recruiter updated failes");
    }
  };

  return (
    <div className="flex flex-col items-center h-auto w-full justify-center p-2">
      <h1>Edit Recruiter</h1>
      <form
        action=""
        className="p-4 rounded w-[58rem] bg-gray-100 border border-2 border-black"
      >
        {/* name */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter First Name</label>
            <br />
            <input
              type="text"
              value={recruiterData.firstname}
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
                  firstname: e.target.value,
                })
              }
              placeholder="First name"
              className="bg-white w-[25rem] pl-4 text-black border border-solid border-black"
            />
          </div>
          <div className="">
            <label htmlFor="">Enter Last Name</label>
            <br />
            <input
              type="text"
              value={recruiterData.lastname}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, lastname: e.target.value })
              }
              placeholder="Last name"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* gmail and phone */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Email</label>
            <br />
            <input
              type="email"
              value={recruiterData.email}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
            <label htmlFor="">Enter Phone </label>
            <br />
            <input
              type="Phone"
              value={recruiterData.mobile}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, mobile: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* password and summery */}
        <div className="flex justify-between">
          {/* <div>
                <label htmlFor="">Enter Password</label>
                <br />
                <input
                  type="password"
                  value={recruiterData.password}
                  onChange={(e) =>
                    setRecruiterData({ ...recruiterData, password: e.target.value })
                  }
                  placeholder="Email"
                  className="bg-white w-[25rem] text-black"
                />
              </div> */}
          <div>
            <label htmlFor="">Profile Summary </label>
            <br />
            <input
              type="text"
              value={recruiterData.summery}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, profile: e.target.value })
              }
              placeholder="Profile Summary"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>

          <div>
            <label htmlFor="">Select Gender</label>
            <br />
            <div className="bg-white h-12 w-[25rem] rounded border border-solid border-black">
              <input
                type="radio"
                className="mt-2"
                value="Male"
                checked={recruiterData.gender === "Male"}
                onChange={(e) =>
                  setRecruiterData({
                    ...recruiterData,
                    gender: e.target.value ? "Male" : "",
                  })
                }
              />
              Male
              <input
                type="radio"
                className="ml-2"
                value="Female"
                checked={recruiterData.gender === "Female"}
                onChange={(e) =>
                  setRecruiterData({
                    ...recruiterData,
                    gender: e.target.value ? "Female" : "",
                  })
                }
              />
              Female
            </div>
          </div>
        </div>

        {/* D.O.B */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Last Qualification</label>
            <br />
            <input
              type="text"
              value={recruiterData.qualification}
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
                  qualification: e.target.value,
                })
              }
              placeholder="Qualification"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
            <label htmlFor="">Enter D.O.B</label>
            <br />
            <input
              type="date"
              className="w-[25rem] bg-white text-black border border-solid border-black"
              value={recruiterData.dob}
              onChange={(e) => handleDobChange(e)}
            />
          </div>
        </div>
        {/* qualification and experience */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Experience </label>
            <br />
            <input
              type="text"
              value={recruiterData.experience}
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
                  experience: e.target.value,
                })
              }
              placeholder="Experience"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* image */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Browse Image</label>
            <br />
            <input
              type="file"
              accept="image/*"
              className="bg-white text-black h-12 w-[40rem] rounded border border-solid border-black"
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
                  profile: e.target.files[0],
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

        <div className="flex mt-6">
          <span>Present image</span>
          <img
            src={HttpClient.IMG_URL + recruiterData.profile}
            alt=""
            style={{ height: "5rem", width: "5rem" }}
          />
        </div>

        <div className="flex justify-center">
          <button className="rounded-xl mt-4 bg-sky-600" onClick={handleUpdate}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecruiter;
