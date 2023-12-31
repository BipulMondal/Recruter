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
    summery: null,
    available_date: "",
  });

  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const [hide, setHide] = useState(false);
  const [image, setImage] = useState("");

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    // console.log("ApplicantCategoryData", result.data);
    if (result && result.status) {
      const filterSkills = result.data.filter((item) => item.status === true);

      setApplicantData((prevData) => ({
        ...prevData,
        category: filterSkills,
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
      const filterSkills = result.data.filter((item) => item.status === true);

      setApplicantData((prevData) => ({
        ...prevData,
        sub_category: filterSkills,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  // date of birth
  const handleDobChange = (e) => {
    e.preventDefault();

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
      !applicantData.relocate ||
      !applicantData.summery ||
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
        summery: applicantData.summery,
        qualification: applicantData.qualification,
        currlocation: applicantData.location,
        keytech: applicantData.keytech,
        keywords: applicantData.keyword,
        dob: applicantData.dob,
        relocate: applicantData.relocate,
        profile: applicantData.profile,
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
          summery: "",
          available_date: "",
        });
      } else {
        toast.error("Applicat Added Successfully");
        console.log("Applicat Added failes");
      }
    }
  };

  // upload resume
  const handleResumeUpload = async (file) => {
    // e.preventDefault();
    if (!file) {
      return;
    }

    let data = new FormData();
    // data.append("image", applicantData.profile);
    data.append("image", file);

    console.log("clicked");
    console.log("data", data);

    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload_resume_data", result);

      if (result && result.status) {
        applicantData.profile = result.data;
        toast.success("Resume Upload Successfully");
      } else {
        toast.error("Resume Can not be uploaded");
      }
    } catch (error) {
      toast.error("resume upload failed");
      console.log("Error uploading resume", error.message);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <div className="flex flex-col items-center h-auto w-full justify-center p-2">
      <h1>Add Consultant</h1>
      <form
        action=""
        className="p-4 rounded w-[58rem] bg-gray-100 border border-2 border-black"
      >
        {/* name */}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Enter First Name</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
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
              className="bg-white w-[25rem] pl-4 text-black border border-solid border-black"
            />
          </div>
          <div className="">
            <div className="flex">
              <label htmlFor="">Enter Last Name</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.lastname}
              onChange={(e) =>
                setApplicantData({ ...applicantData, lastname: e.target.value })
              }
              placeholder="Last name"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* gmail and phone */}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Enter Email</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="email"
              value={applicantData.email}
              onChange={(e) =>
                setApplicantData({ ...applicantData, email: e.target.value })
              }
              placeholder="Email"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
            <div className="flex">
              <label htmlFor="">Enter Mobile</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="Phone"
              value={applicantData.phone}
              onChange={(e) =>
                setApplicantData({ ...applicantData, phone: e.target.value })
              }
              placeholder="Phone"
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* gender and D.O.B */}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Enter Gender</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <div className="bg-white h-12 w-[25rem] rounded border border-solid border-black">
              <input
                type="radio"
                className="mt-2"
                value="male"
                checked={applicantData.gender === "male"}
                onChange={(e) =>
                  setApplicantData({ ...applicantData, gender: e.target.value })
                }
              />
              Male
              <input
                type="radio"
                className="ml-2"
                value="female"
                checked={applicantData.gender === "female"}
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
            <div className="flex">
              <label htmlFor="">Enter Date Of Birth</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="date"
              className="w-[25rem] bg-white text-black border border-solid border-black"
              value={applicantData.dob}
              onChange={(e) => handleDobChange(e)}
            />
          </div>
        </div>
        {/* qualification and experience */}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Enter Last Qualification</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
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
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
            <div className="flex">
              <label htmlFor="">Enter Experience</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
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
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>
        {/* skills and subskills */}
        <div className="flex justify-between">
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
              className="bg-white h-12 w-[25rem] rounded border border-solid border-black"
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
            <div className="flex">
              <label htmlFor="">Select Sub Skills</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <select
              name="subSkills"
              id="subSkills"
              className="bg-white h-12 w-[25rem] rounded border border-solid border-black"
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
            <div className="flex">
              <label htmlFor="">Enter Key Technologies</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
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
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
          <div>
            <div className="flex">
              <label htmlFor="">Enter Key Word</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
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
              className="bg-white w-[25rem] text-black border border-solid border-black"
            />
          </div>
        </div>

        {/* location and relocate*/}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Enter Current Location</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="text"
              value={applicantData.location}
              placeholder="Current Location"
              className="bg-white w-[25rem] text-black border border-solid border-black"
              onChange={(e) =>
                setApplicantData({ ...applicantData, location: e.target.value })
              }
            />
          </div>

          <div>
            <div className="flex">
              <label htmlFor="">Willing to relocate</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <div className="bg-white h-12 w-[25rem] rounded border border-solid border-black">
              <input
                type="radio"
                className="mt-2"
                value="yes"
                checked={applicantData.relocate === "yes"}
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
                value="no"
                checked={applicantData.relocate === "no"}
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
            <div className="flex">
              <label htmlFor="">Enter Profile Summary</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="text"
              placeholder="Profile Summary"
              className="rounded w-[25rem] text-black border border-solid border-black bg-white text-black"
              value={applicantData.summery}
              onChange={(e) =>
                setApplicantData({ ...applicantData, summery: e.target.value })
              }
            />
          </div>

          <div>
            <div className="flex">
              <label htmlFor="">Available date</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              value={applicantData.available_date}
              type="text"
              className="bg-white text-black h-12 w-[25rem] rounded border border-solid border-black"
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
        {/* image */}
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <label htmlFor="">Browse Image</label>
              <span>
                <GiFlowerStar
                  style={{ marginTop: "20px", color: "red", fontSize: "10px" }}
                />
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="bg-white text-black h-12 w-[40rem] rounded border border-solid border-black"
              // onChange={(e) =>
              //   setApplicantData({
              //     ...applicantData,
              //     profile: e.target.files[0],
              //   })
              // }
              onChange={(e) => handleResumeUpload(e.target.files[0])}
            />
            {/* <button
              className="bg-white text-black border border-2 rounded h-12 border-black"
              onClick={handleResumeUpload}
            >
              Upload Image
            </button> */}
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
