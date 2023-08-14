import React, { useState, useEffect } from "react";
import HttpClient from "../../components/HttpClient";
import { Link } from "react-router-dom";

const ManageConsultant = () => {
  const [consultantData, setConsultantData] = useState([]);


  const fetchConsultantdata = async () => {
    let result = await HttpClient.requestData("consultant", "GET");
    console.log("viewconsultantdata", result.data);
    setConsultantData(result.data);
  };


  const handleConsultantDelete = async (itemId) => {

   alert("Are you really want to delete this client ?");

    let result = HttpClient.requestData(`/.../${itemId}`, "DELETE")
   
  }

  useEffect(() => {
    fetchConsultantdata();
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <div className="min-w-max">
        <table className="bg-gray-200 w-auto text-black table-fixed">
          <thead>
            <tr className="bg-blue-300 space-x-4">
              <th className="border border-2">First Name</th>
              <th className="">Last Name</th>
              <th className="">Email</th>
              <th className="">Mobile</th>
              <th className="">Experience</th>
              <th className="">Gender</th>
              <th className="">Date Of Birth</th>
              <th className="">Profile Summary</th>
              <th className="">Qualification</th>
              <th className="">Skills</th>
              <th className="">Sub Skills</th>
              <th className="">Key Technologies</th>
              <th className="">Key Word</th>
              <th className="">Location</th>
              <th className="">Relocate(y/n)</th>
              <th className="">Resume</th>
              <th className="">Edit</th>
              <th className="">Delete</th>
            </tr>
          </thead>
          <tbody>
            {consultantData.map((item) => (
              <tr key={item._id}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.experience}</td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td>{item.summery}</td>
                <td>{item.qualification}</td>
                <td>{item.keytech}</td>
                <td>{item.subcategory_data?.name}</td>
                <td>{item.category_data?.name}</td>
                <td>{item.keywords}</td>
                <td>{item.currlocation}</td>
                <td>{item.relocate}</td>
                <td>{item.resume}</td>
                <Link to={`/edit-consultant/${item._id}`}>
                <button 
                className="h-10 w-18 rounded border border-2 bg-yellow-500 text-black">
                  Edit
                </button>
                </Link>
                <button 
                onClick={() => handleConsultantDelete(item._id)}
                className="h-10 w-18 rounded border border-2 bg-red-500 text-black">
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageConsultant;
