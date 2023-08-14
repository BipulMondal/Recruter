import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { GiFlowerStar } from "react-icons/gi";

const AddApplicant = () => {
  const [applicantData, setApplicantData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: null,
    dob: "",
    qualification: "",
    experience: "",
    category: [],
    sub_category: [],
    keyword: "",
    keytech: "",
    location: "",
    profile: "",
    relocate: null,
    resume: null,
    available_date: "",
  });

  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const [hide, setHide] = useState(false);
  const [error, setError] = useState("");

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    // console.log("ApplicantCategoryData", result.data);
    if (result && result.status) {
      setApplicantData((prevData) => ({
        ...prevData,
        category: result.data,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  //handle category id
  const handleCategoryId = (e) => {
    const categoryId = e.target.value;
    const category = applicantData.category.find(
      (item) => item._id === categoryId
    );
    setHide(category === null);
    setSelectCategory(category);
    fetchSubCategoryData(categoryId);
    console.log("categoryId", categoryId);
  };

  // handle subcategory id
  const handleSubCategoryId = (e) => {
    const subCategoryId = e.target.value;
    const subCategory = applicantData.sub_category.find(
      (item) => item._id === subCategoryId
    );
    setHide(subCategory === null);
    setSelectSubCategory(subCategory);
  };

  //   fetch subcategory data
  const fetchSubCategoryData = async (categoryId) => {
    let result = await HttpClient.requestData(
      `subcategoryBycat/${categoryId}`,
      "GET"
    );

    console.log("categoryId for fetch subcategory", categoryId);

    if (result && result.status) {
      try {
        setApplicantData((prevData) => ({
          ...prevData,
          sub_category: result.data,
        }));
        console.log("tefchsubcategory.....", result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // date of birth
  const handleDobChange = (e) => {
    e.preventDefault();

    const date = e.target.value;
    // console.log(date);

    setApplicantData({
      ...applicantData,
      dob: e.target.value,
    });
  };

  // submit ApplicantData
  const handleApplicantSubmit = async (e) => {
    e.preventDefault();

    if (
      !applicantData.firstname ||
      !applicantData.lastname ||
      !applicantData.email ||
      !applicantData.phone ||
      !applicantData.experience ||
      !applicantData.gender ||
      !applicantData.dob ||
      !applicantData.qualification ||
      !applicantData.category ||
      !applicantData.sub_category ||
      !applicantData.keyword ||
      !applicantData.keytech ||
      !applicantData.location ||
      !applicantData.profile ||
      applicantData.relocate === null ||
      applicantData.resume === null ||
      !applicantData.available_date
    ) {
      // setError("Fields are required");
      alert("All * fields are required");
    } else {
      let data = {
        firstname: applicantData.firstname,
        lastname: applicantData.lastname,
        email: applicantData.email,
        mobile: applicantData.phone,
        experience: applicantData.experience,
        gender: applicantData.gender,
        summery: applicantData.profile,
        qualification: applicantData.qualification,
        currlocation: applicantData.location,
        keytech: applicantData.keytech,
        keywords: applicantData.keyword,
        dob: applicantData.dob,
        relocate: applicantData.relocate,
        profile: applicantData.resume,
        availableDate: applicantData.available_date,
        categoryid: selectCategory ? selectCategory._id : null,
        subcategoryid: selectSubCategory ? selectSubCategory._id : null,
      };

      console.log(data);
      let result = await HttpClient.requestData("consultant", "POST", data);

      if (result && result.status) {
        toast.success("Applicat Added Successfully");
        console.log("Applicat Added Successfully");
        setApplicantData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gender: applicantData.gender,
          dob: "",
          qualification: "",
          experience: "",
          category: [],
          sub_category: [],
          keyword: "",
          keytech: "",
          location: "",
          profile: "",
          relocate: applicantData.relocate,
          resume: null,
          available_date: "",
        });
      } else {
        toast.error("Applicat Added Successfully");
        console.log("Applicat Added failes");
      }
    }
  };

  // upload resume
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", applicantData.resume);
    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if (result && result.status) {
        applicantData.resume = result.data;
        toast.success("Resume Upload Successfully");
      } else {
        toast.error("Resume Can not be uploaded");
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
      <h1>Add Consultant</h1>
      <form action="" className="p-4 rounded w-[58rem] bg-gray-200">
        {/* name */}
        <div className="flex justify-between">
          <div>
            <div className="flex justify-between">
              <label htmlFor="">Enter First Name</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.firstname}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  firstname: e.target.value,
                })
              }
              placeholder="First name"
              className="bg-white w-[25rem] pl-4 text-black"
            />
          </div>
          <div className="">
          <div className="flex justify-between">
              <label htmlFor="">Enter Last Name</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.lastname}
              onChange={(e) =>
                setApplicantData({ ...applicantData, lastname: e.target.value })
              }
              placeholder="Last name"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>
        {/* gmail and phone */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Email</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="email"
              value={applicantData.email}
              onChange={(e) =>
                setApplicantData({ ...applicantData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[25rem] text-black"
            />
          </div>
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Mobile</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="Phone"
              value={applicantData.phone}
              onChange={(e) =>
                setApplicantData({ ...applicantData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>
        {/* gender and D.O.B */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Gender</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <div className="bg-white h-12 w-[25rem] rounded">
              <input
                type="radio"
                className="mt-2"
                value="Male"
                onChange={(e) =>
                  setApplicantData({ ...applicantData, gender: e.target.value })
                }
              />
              Male
              <input
                type="radio"
                className="ml-2"
                value="Female"
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    gender: e.target.value,
                  })
                }
              />
              Female
            </div>
          </div>
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Date Of Birth</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="date"
              className="w-[25rem] bg-white text-black"
              value={applicantData.dob}
              onChange={(e) => handleDobChange(e)}
            />
          </div>
        </div>
        {/* qualification and experience */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Last Qualification</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.qualification}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  qualification: e.target.value,
                })
              }
              placeholder="Qualification"
              className="bg-white w-[25rem] text-black"
            />
          </div>
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Experience</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.experience}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  experience: e.target.value,
                })
              }
              placeholder="Experience"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>
        {/* category and subcategory */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Select Skills</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <select
              name="category"
              id="category"
              className="bg-white h-12 w-[25rem] rounded"
              value={selectCategory ? selectCategory._id : ""}
              onChange={(e) => handleCategoryId(e)}
            >
              <option value={""}>Select a Skills</option>

              {Array.isArray(applicantData.category) &&
                applicantData.category.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Select Sub Skills</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <select
              name="subSkills"
              id="subSkills"
              className="bg-white h-12 w-[25rem] rounded"
              value={selectSubCategory ? selectSubCategory._id : ""}
              onChange={(e) => handleSubCategoryId(e)}
            >
              <option value={""}>Select Sub Skills</option>
              {Array.isArray(applicantData.sub_category) &&
                applicantData.sub_category.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* key technology and keyword */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Key Technologies</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.keytech}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  keytech: e.target.value,
                })
              }
              placeholder="Key Technologies"
              className="bg-white w-[25rem] text-black"
            />
          </div>
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Key Word</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.keyword}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  keyword: e.target.value,
                })
              }
              placeholder="Key Word"
              className="bg-white w-[25rem] text-black"
            />
          </div>
        </div>

        {/* location and relocate*/}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Current Location</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.location}
              placeholder="Current Location"
              className="bg-white w-[25rem] text-black"
              onChange={(e) =>
                setApplicantData({ ...applicantData, location: e.target.value })
              }
            />
          </div>

          <div>
          <div className="flex justify-between">
              <label htmlFor="">Willing to relocate</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <div className="bg-white h-12 w-[25rem] rounded">
              <input
                type="radio"
                className="mt-2"
                value="Yes"
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    relocate: e.target.value,
                  })
                }
              />
              Yes
              <input
                type="radio"
                className="ml-4"
                value="No"
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    relocate: e.target.value,
                  })
                }
              />
              No
            </div>
          </div>
        </div>

        {/* profile summary and availabledate */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Enter Profile Summary</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <textarea
              name=""
              id=""
              cols="25"
              rows="2"
              placeholder="Profile Summary"
              className="rounded w-[25rem] text-black"
              value={applicantData.profile}
              onChange={(e) =>
                setApplicantData({ ...applicantData, profile: e.target.value })
              }
            ></textarea>
          </div>

          <div>
          <div className="flex justify-between">
              <label htmlFor="">Available date</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="text"
              className="bg-white text-black h-12 w-[25rem] rounded"
              placeholder="Available date"
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  available_date: e.target.value,
                })
              }
            />
          </div>
        </div>
        {/* Resume */}
        <div className="flex justify-between">
          <div>
          <div className="flex justify-between">
              <label htmlFor="">Browse Resume</label>
              <span>
                <GiFlowerStar style={{ marginTop: "20px", color: "red", fontSize: "15px" }} />
              </span>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-white text-black h-12 w-[40rem] rounded"
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
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
