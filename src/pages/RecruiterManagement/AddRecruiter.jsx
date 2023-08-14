import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";

const AddApplicant = () => {
  const [recruiterData, setRecruiterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    gender: null,
    dob: "",
    qualification: "",
    experience: "",
    profile: "",
    resume: null,
  });


  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    // console.log("ApplicantCategoryData", result.data);
    if (result && result.status) {
      setRecruiterData((prevData) => ({
        ...prevData,
        category: result.data,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };
 

  // date of birth 
  const handleDobChange = (e) => {
    e.preventDefault();

    const date = e.target.value;
    // console.log(date);

    setRecruiterData({
      ...recruiterData,
      dob: e.target.value,
    })
  }

  // submit recruiterData
  const handleApplicantSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstname: recruiterData.firstname,
      lastname: recruiterData.lastname,
      email: recruiterData.email,
      password: recruiterData.password,
      mobile: recruiterData.phone,
      experience: recruiterData.experience,
      gender: recruiterData.gender,
      summery: recruiterData.profile,
      qualification: recruiterData.qualification,
      dob: recruiterData.dob,
      profile: recruiterData.resume,
      
    };

    console.log(data);
    let result = await HttpClient.requestData("recruiter", "POST", data);

    if(result && result.status){
      toast.success("Recruiter Added Successfully")
      console.log("Recruiter Added Successfully")
      setRecruiterData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        gender: null,
        dob: "",
        qualification: "",
        experience: "",
        profile: "",
        resume: null,
      })
    }
    else{
      toast.error("Recruiter Added failed")
      console.log("Recruiter Added failed")
    }

  };

  // upload resume
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", recruiterData.resume);
    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if(result && result.status) {
          recruiterData.resume = result.data;
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
    fetchCategoryData();
  }, []);

  return (
    <div className="flex flex-col items-center h-auto w-full justify-center p-2">
      <h1>Add Recruiter</h1>
      <form action="" className="p-4 rounded w-[58rem] bg-gray-200">
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
              className="bg-white w-[25rem] pl-4 text-black"
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
              className="bg-white w-[25rem] text-black"
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
              className="bg-white w-[25rem] text-black"
            />
          </div>
          <div>
            <label htmlFor="">Enter Phone </label>
            <br />
            <input
              type="Phone"
              value={recruiterData.phone}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>

        {/* password and summary */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Password</label>
            <br />
            <input
              type="email"
              value={recruiterData.password}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, password: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[25rem] text-black"
            />
          </div>
          <div>
            <label htmlFor="">Profile Summary </label>
            <br />
            <input
              type="Phone"
              value={recruiterData.profile}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, profile: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>

        {/* gender and D.O.B */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Select Gender</label>
            <br />
            <div className="bg-white h-12 w-[25rem] rounded">
              <input
                type="radio"
                className="mt-2"
                value="Male"
                onChange={(e) =>
                  setRecruiterData({ ...recruiterData, gender: e.target.value })
                }
              />
              Male
              <input
                type="radio"
                className="ml-2"
                value="Female"
                onChange={(e) =>
                  setRecruiterData({
                    ...recruiterData,
                    gender: e.target.value,
                  })
                }
              />
              Female
            </div>
          </div>
          <div>
            <label htmlFor="">Enter D.O.B</label>
            <br />
            <input
              type="date"
              className="w-[25rem] bg-white text-black"
              value={recruiterData.dob}
              onChange={(e) => handleDobChange(e)}
            />
          </div>
        </div>
        {/* qualification and experience */}
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
              className="bg-white w-[25rem] text-black"
            />
          </div>
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
              className="bg-white w-[25rem] text-black"
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
              className="bg-white text-black h-12 w-[40rem] rounded"
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
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
          <button className="rounded-xl mt-4" onClick={handleApplicantSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplicant;