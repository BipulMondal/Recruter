import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { GiFlowerStar } from "react-icons/gi";

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

    setRecruiterData({
      ...recruiterData,
      dob: e.target.value,
    })
  }

  // submit recruiterData
  const handleApplicantSubmit = async (e) => {
    e.preventDefault();

    if(!recruiterData.firstname ||
      !recruiterData.lastname ||
      !recruiterData.email ||
      !recruiterData.password ||
      !recruiterData.phone ||
      !recruiterData.experience ||
      !recruiterData.gender ||
      !recruiterData.profile ||
      !recruiterData.qualification ||
      !recruiterData.dob
      ){
        alert(" * field are required")
      }else{let data = {
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
  }
    
  };

  // upload resume
  const handleImageUpload = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", recruiterData.resume);

    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if(result && result.status) {
          recruiterData.resume = result.data;
          toast.success("Image Upload Successfully")
      }
      else{
        toast.error("Image Can not be uploaded")
      }
    } catch (error) {
      console.log("Error uploading Image", error.message);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div className="flex flex-col items-center h-auto w-full justify-center p-2">
      <h1>Add Recruiter</h1>
      <form action="" className="p-4 rounded w-[58rem] bg-gray-100 border border-2 border-black">
        {/* name */}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter First Name</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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
          <div className=" flex">
          <label htmlFor="">Enter Last Name</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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
          <div className=" flex">
          <label htmlFor="">Enter Email</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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
          <div className=" flex">
          <label htmlFor="">Enter Mobile</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
            <input
              type="Phone"
              value={recruiterData.phone}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* password and summary */}
        <div className="flex justify-between">
          <div>
          <div className=" flex ">
          <label htmlFor="">Enter Password</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
            <input
              type="password"
              value={recruiterData.password}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, password: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
          <div className=" flex">
          <label htmlFor="">Enter Summery</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
            <input
              type="text"
              value={recruiterData.profile}
              onChange={(e) =>
                setRecruiterData({ ...recruiterData, profile: e.target.value })
              }
              placeholder="Profile Summary"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* gender and D.O.B */}
        <div className="flex justify-between">
          <div>
          <div className=" flex">
          <label htmlFor="">Enter Gender</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
            <div className="bg-white h-12 w-[25rem] rounded border border-solid border-black">
              <input
                type="radio"
                className="mt-2"
                value="Male"
                checked=""
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
          <div className=" flex">
          <label htmlFor="">Enter DOB</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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
          <div className=" flex">
          <label htmlFor="">Enter Qualification</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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
          <div className=" flex">
          <label htmlFor="">Enter Experience</label>
              <span>
                <GiFlowerStar style={{marginTop: "20px", color: "red", fontSize: "10px"  }} />
              </span>
          </div>
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


        {/* Resume */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Browse Image</label>
            <br />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-white text-black h-12 w-[40rem] rounded border border-solid border-black"
              onChange={(e) =>
                setRecruiterData({
                  ...recruiterData,
                  resume: e.target.files[0],
                })
              }
            />
            <button
              className="bg-white text-black border border-2 rounded h-12 "
              onClick={handleImageUpload}
            >
              Upload Image
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
