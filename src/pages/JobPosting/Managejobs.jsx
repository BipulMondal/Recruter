import React, { useState, useEffect } from "react";
import HttpClient from "../../components/HttpClient";
import { Link } from "react-router-dom";
import { Header } from "../../components";
import DataTable from "react-data-table-component";

const ManageConsultant = () => {
  const [jobData, setJobData] = useState([]);
  const [status, setStatus] = useState(false);


  useEffect(() => {
    fetchJobData();
  }, [status]);



   const fetchJobData = async () => {
    let result = await HttpClient.requestData("job", "GET");

    console.log("client result", result.data)

    if (result) {
      let arr = result?.data.map((jobs, index) => {
        return {
          sl: index + 1,
          Title: (
            <div style={{ fontSize: "13px" }}>
             {jobs?.title}
            </div>
          ),
          Location: (
            <div style={{ fontSize: "13px" }}>{jobs?.location}</div>

          ),
          Rate: (
            <div style={{ fontSize: "13px", width:"15rem" }}>{jobs?.rate}</div>

          ),
          Roles: (
            <div style={{ fontSize: "13px" }}>{jobs?.roles}</div>

          ),
          Requirements: (
            <div style={{ fontSize: "13px" }}>{jobs?.requiements}</div>

          ),
          JobStatus: (
            <div style={{ fontSize: "13px" }}>{jobs?.jobStatus}</div>

          ),
          Category: (
            <div style={{ fontSize: "13px" }}>{jobs?.category_data[0]?.name}</div>

          ),
          SubCategory: (
            <div style={{ fontSize: "13px" }}>{jobs?.subcategory_data[0]?.name}</div>

          ),
          Client: (
            <div style={{ fontSize: "13px" }}>{jobs?.client_data[0]?.firstname + jobs?.client_data[0]?.lastname }</div>

          ),
          Action: (
            <div style={{ display: "flex", flexDirection: "coloum" }}>
              <Link to={`/edit-jobs/${jobs._id}`}>
              <svg
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                  marginRight: "34px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
              </Link>
              {/* <svg
                // onClick={() => handleConsultantDelete(consultant._id)}
                style={{
                  color: "red",
                  height: "20px",
                  cursor: "pointer",
                  width: "20px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg> */}
             
            </div>
          ),
        //   Status: (
        //     <button
        //     className="h-8 w-18 bg-white border border-black rounded-xl text-black ml-4 font-bold pt-[-4px]"
        //     // onClick={() => handleStatusChange(jobs._id, jobs.status)}
        //   >
        //     {jobs.status ? "inActive" : "Active"}
        //   </button>
        //   )

        };
      });

      // console.log(arr)
      setJobData(arr);
    }
  };

  // status change
//   const handleStatusChange = async (consultantId) => {
//     let data = {
//       categoryID: consultantId,
//     };
//     console.log("selected id", data)

//     let resultStatus = await HttpClient.requestData(
//       `consultant/set-status/${consultantId}`,
//       "PUT",
//       data
//     );

//     console.log("handlechange.....", resultStatus.data.status);
//     setConsultantData((prevData) =>
//     prevData.map((client) =>
//       client._id === consultantId
//         ? { ...client, status: resultStatus.data.status }
//         : client
//     )
//   );

//   await fetchConsultantData();
//   };

  const columns = [
    {
      name: <div style={{ fontSize: "14px", fontWeight: "bolder" }}>SL</div>,
      selector: (row) => row.sl,
    },

    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          Title
        </div>
      ),
      selector: (row) => row.Title,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          Location
        </div>
      ),
      selector: (row) => row.Location,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", marginLeft: "15px", fontWeight: "bolder" }}
        >
          Rate
        </div>
      ),
      selector: (row) => row.Rate,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          Roles
        </div>
      ),
      selector: (row) => row.Roles,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          Requirements
        </div>
      ),
      selector: (row) => row.Requirements,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          JobStatus
        </div>
      ),
      selector: (row) => row.JobStatus,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
          Category
        </div>
      ),
      selector: (row) => row.Category,
    },
    {
        name: (
          <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
            SubCategory
          </div>
        ),
        selector: (row) => row.SubCategory,
      },
      {
        name: (
          <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Client
          </div>
        ),
        selector: (row) => row.Client,
      },
      {
        name: (
          <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
            Action
          </div>
        ),
        selector: (row) => row.Action,
      },
    //   {
    //     name: (
    //       <div style={{ fontSize: "14px", fontWeight: "bolder" }}>
    //         Status
    //       </div>
    //     ),
    //     selector: (row) => row.Status,
    //   },

  ];



  

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Posted Jobs List" />
    <DataTable columns={columns} data={jobData} pagination />
  </div>
  );
};

export default ManageConsultant;
