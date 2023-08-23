import React, { useState, useEffect } from "react";
import HttpClient from "../../components/HttpClient";
import DataTable from "react-data-table-component";
import { Header } from "../../components";

const ViewApplicant = () => {
  const [viewApplicant, setViewApplicant] = useState("");

  const fetchApplicantData = async () => {
    let result = await HttpClient.requestData("applicant", "GET");

    console.log("AppplicantData", result.data);

    if (result) {
      let arr = result?.data.map((consultant, index) => {
        return {
          sl: index + 1,
          Name: (
            <div style={{ fontSize: "13px" }}>
              {consultant?.firstname + " " + consultant?.lastname}
            </div>
          ),
          Email: (
            <div style={{ fontSize: "13px", width: "15rem" }}>
              {consultant?.email}
            </div>
          ),
          Mobile: <div style={{ fontSize: "13px" }}>{consultant?.mobile}</div>,
          Experience: (
            <div style={{ fontSize: "13px" }}>{consultant?.experience}</div>
          ),
          Gender: <div style={{ fontSize: "13px" }}>{consultant?.gender}</div>,
          DOB: <div style={{ fontSize: "13px" }}>{consultant?.dob}</div>,
          Location: (
            <div style={{ fontSize: "13px" }}>{consultant?.currlocation}</div>
          ),
          Profile: (
            // <div style={{ fontSize: "13px" }}>{consultant?.profile}</div>
            // <img src={HttpClient.IMG_URL + consultant?.profile} alt="logo" />
            <a href={HttpClient.IMG_URL + consultant?.profile} target="_blank">
              Resume
            </a>
          ),
          //   Action: (
          //     <div style={{ display: "flex", flexDirection: "coloum" }}>
          //       <Link to={`/edit-consultant/${consultant._id}`}>
          //         <svg
          //           style={{
          //             height: "20px",
          //             width: "20px",
          //             cursor: "pointer",
          //             marginRight: "34px",
          //           }}
          //           xmlns="http://www.w3.org/2000/svg"
          //           width="16"
          //           height="16"
          //           fill="currentColor"
          //           class="bi bi-pencil-square"
          //           viewBox="0 0 16 16"
          //         >
          //           <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          //           <path
          //             fill-rule="evenodd"
          //             d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          //           />
          //         </svg>
          //       </Link>
          //       <svg
          //         onClick={() => handleConsultantDelete(consultant._id)}
          //         style={{
          //           color: "red",
          //           height: "20px",
          //           cursor: "pointer",
          //           width: "20px",
          //         }}
          //         xmlns="http://www.w3.org/2000/svg"
          //         width="16"
          //         height="16"
          //         fill="currentColor"
          //         class="bi bi-trash3"
          //         viewBox="0 0 16 16"
          //       >
          //         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          //       </svg>
          //     </div>
          //   ),
          //   Status: (
          //     <button
          //       className="h-8 w-18 bg-white border border-black rounded-xl text-black ml-4 font-bold pt-[-4px]"
          //       onClick={() =>
          //         handleStatusChange(consultant._id, consultant.status)
          //       }
          //     >
          //       {consultant.status ? "inActive" : "Active"}
          //     </button>
          //   ),
        };
      });

      // console.log(arr)
      setViewApplicant(arr);
    }
  };

  useEffect(() => {
    fetchApplicantData();
  }, []);

  const columns = [
    {
      name: <div style={{ fontSize: "14px", fontWeight: "bolder" }}>SL</div>,
      selector: (row) => row.sl,
    },

    {
      name: <div style={{ fontSize: "14px", fontWeight: "bolder" }}>Name</div>,
      selector: (row) => row.Name,
    },
    {
      name: (
        <div
          style={{ fontSize: "14px", marginLeft: "15px", fontWeight: "bolder" }}
        >
          Email
        </div>
      ),
      selector: (row) => row.Email,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>Mobile</div>
      ),
      selector: (row) => row.Mobile,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>Experience</div>
      ),
      selector: (row) => row.Experience,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>Profile</div>
      ),
      selector: (row) => row.Profile,
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="All Consultant List" />
      <DataTable columns={columns} data={viewApplicant} pagination />
    </div>
  );
};

export default ViewApplicant;
