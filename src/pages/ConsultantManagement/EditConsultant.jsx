import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HttpClient from "../../components/HttpClient";
import { useParams, useNavigate } from "react-router-dom";

const EditConsultant = () => {
  const [applicantData, setApplicantData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    gender: null,
    dob: "",
    qualification: "",
    experience: "",
    category: [],
    sub_category: [],
    keywords: "",
    keytech: "",
    currlocation: "",
    summery: "",
    relocate: null,
    resume: null,
    availableDate: "",
  });

  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  //   console.log("paramsId", params.id)

  //fetch category data
  const fetchCategoryData = async () => {
    let result = await HttpClient.requestData("category", "GET");
    console.log("ApplicantCategoryData", result.data);

    if (result && result.status) {
      setApplicantData((prevData) => ({
        ...prevData,
        category: result.data,
      }));
    } else {
      toast.error("Error to fetch Category Data");
    }
  };

  //fetch Consultant data
  const fetchConsultantData = async () => {
    let result = await HttpClient.requestData("consultant", "GET");
    // console.log("ConsultantData", result.data);

    if (result && result.status) {
      const filterData = result.data.filter((item) => item._id === params.id);
      console.log("filterData", filterData[0]);

      if (filterData) {
        setApplicantData(filterData[0]);
      }
    } else {
      toast.error("Error to fetch Consultant Data");
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

  // submit Updated ApplicantData
  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = {
      firstname: applicantData.firstname,
      lastname: applicantData.lastname,
      email: applicantData.email,
      mobile: applicantData.mobile,
      experience: applicantData.experience,
      gender: applicantData.gender,
      summery: applicantData.summery,
      qualification: applicantData.qualification,
      currlocation: applicantData.currlocation,
      keytech: applicantData.keytech,
      keywords: applicantData.keywords,
      dob: applicantData.dob,
      relocate: applicantData.relocate,
      profile: applicantData.resume,
      availableDate: applicantData.availableDate,
      categoryid: selectCategory._id,
      subcategoryid: selectSubCategory._id,
    };

    console.log(data);
    let result = await HttpClient.requestData(
      `consultant/${params.id}`,
      "PUT",
      data
    );

    if (result && result.status) {
      toast.success("Consultant updated Successfully");
      console.log("Consultant updated Successfully");
      navigate("/manage-consultant");
    } else {
      toast.error("Consultant updated failed");
      console.log("Consultant updated failes");
    }
  };

  // upload resume
  const handleImageUpload = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", applicantData.resume);
    try {
      let result = await HttpClient.fileUplode("uploadFile", "POST", data);
      console.log("upload resume data", result);
      if (result && result.status) {
        applicantData.resume = result.data;
        toast.success("Image Upload Successfully");
      } else {
        toast.error("Image Can not be uploaded");
      }
    } catch (error) {
      console.log("Error uploading Image", error.message);
    }
  };

  useEffect(() => {
    fetchConsultantData();
    fetchCategoryData();
  }, []);

  return (
    <div className="flex h-auto w-full justify-center p-2">
      <form action="" className="p-4 rounded w-[58rem] bg-gray-200">
        {/* name */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter First Name</label>
            <br />
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
            <label htmlFor="">Enter Last Name</label>
            <br />
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
        {/* gmail and mobile */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Enter Email</label>
            <br />
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
            <label htmlFor="">Enter Mobile </label>
            <br />
            <input
              type="Phone"
              value={applicantData.mobile}
              onChange={(e) =>
                setApplicantData({ ...applicantData, mobile: e.target.value })
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
                checked={applicantData.gender === "Male"}
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    gender: e.target.value ? "Male" : "",
                  })
                }
              />
              Male
              <input
                type="radio"
                className="ml-2"
                value="Female"
                checked={applicantData.gender === "Female"}
                onChange={(e) =>
                  setApplicantData({
                    ...applicantData,
                    gender: e.target.value ? "Female" : "",
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
              value={applicantData.dob}
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
            <label htmlFor="">Enter Experience </label>
            <br />
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
        {/* skills and subSkills */}
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Select Skills</label>
            <br />
            <select
              name="category"
              id="category"
              className="bg-white h-12 w-[25rem] rounded"
              value={selectCategory ? selectCategory._id : ""}
              onChange={(e) => handleCategoryId(e)}
            >
              <option value={""}>Select Skills</option>
              {/* <option value="">
                {applicantData.category.length > 0
                  ? applicantData.category[0].name
                  : "Select Skills"}
              </option> */}

              {Array.isArray(applicantData.category) &&
                applicantData.category.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Select Sub Skills</label>
            <br />
            <select
              name="subSkills"
              id="subSkills"
              className="bg-white h-12 w-[25rem] rounded"
              value={selectSubCategory ? selectSubCategory._id : ""}
              onChange={(e) => handleSubCategoryId(e)}
            >
              <option value={""}>Select Sub Skills</option>
              {/* <option value="">
                {applicantData.subcategory_data.length > 0
                  ? applicantData.subcategory_data[0].name
                  : "Select Sub Skills"}
              </option> */}

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
            <label htmlFor="">Enter Key Technologies</label>
            <br />
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
            <label htmlFor="">Enter Key Word </label>
            <br />
            <input
              type="text"
              value={applicantData.keywords}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  keywords: e.target.value,
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
            <label htmlFor="">Enter Current Location</label>
            <br />
            <input
              type="text"
              value={applicantData.currlocation}
              placeholder="Current Location"
              className="bg-white w-[25rem] text-black"
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  currlocation: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="">Willing to Relocate ?</label>
            <br />
            <div className="bg-white h-12 w-[25rem] rounded">
              <input
                type="radio"
                className="mt-2"
                value="Yes"
                checked={applicantData.relocate === "Yes"}
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
                checked={applicantData.relocate === "No"}
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
            <label htmlFor="">Enter Profile Summary</label>
            <br />
            <textarea
              name=""
              id=""
              cols="25"
              rows="2"
              placeholder="Profile Summary"
              className="rounded w-[25rem] text-black"
              value={applicantData.summery}
              onChange={(e) =>
                setApplicantData({ ...applicantData, summery: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label htmlFor="">Available date</label>
            <br />
            <input
              type="text"
              className="bg-white text-black h-12 w-[25rem] rounded"
              placeholder="Available date"
              value={applicantData.availableDate}
              onChange={(e) =>
                setApplicantData({
                  ...applicantData,
                  availableDate: e.target.value,
                })
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
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="rounded-xl mt-4" onClick={handleUpdate}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditConsultant;
