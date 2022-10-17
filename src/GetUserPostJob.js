import axios from "axios";
import { useState, useEffect } from "react";
import { GrUserWorker } from "react-icons/gr";
import styles from "./css/ProfileSection.module.css";

const GetUserPostJob = () => {
  const [request, setRequest] = useState();
  const [details, setDetails] = useState();
  const [editMood, setEditMood] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const API = axios.create({ baseURL: "https://vast-oasis-87088.herokuapp.com" });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const getRequestHandler = async () => {
    console.log("Clicked!");
    const response = await API.get("/getuserjob");
    console.log(response.data);
    setDetails(response.data);
    setRequest("GET");
  };

  useEffect(() => {
    getRequestHandler();
  }, []);

  const removeJob = async (id) => {
    try {
      const response = await API.delete(`/deleteuserjob/${id}`);
      console.log(response);
      getRequestHandler();
    } catch (error) {
      alert(error);
    }
  };

  if (!user?.token) {
    return <div>You are not logged in</div>;
  }
  const submitEditJob = async (e) => {
    e.preventDefault();

    const formDataCollection = e.target.children;
    const formData = {};

    for (let x = 0; x < formDataCollection.length; x++) {
      if (formDataCollection[x].tagName === "INPUT") {
        formData[formDataCollection[x].name] = formDataCollection[x].value;
      }
    }

    console.log("form data", formData);

    try {
      const response = await fetch(
        `https://vast-oasis-87088.herokuapp.com/updatejob/${editJob._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      getRequestHandler();
      setEditMood(false);
    } catch (error) {}
  };

  const changeEditMood = (item) => {
    setEditJob(item);
    setEditMood(true);
  };
  // const submitEditAccommodation = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target.value);
  //   try {
  //     const response = await API.put(
  //       `/updatejob/${setEditJob._id}`,
  //       formData()
  //     );
  //     getRequestHandler();
  //     setEditMood(false);
  //   } catch (error) {}
  // };

  // const changeEditMood = (item) => {
  //   setEditJob(item);
  //   setEditMood(true);
  // };

  return (
    <>
      {/* <PostStatus/> */}

      {request
        ? details.map((value) => {
            return (
              <div className={styles.accommodationMainContainer}>
                <h4 className={styles.title}> Your Job List:</h4>

                <div className={styles.Container} key={value._id}>
                  <div className={styles.detailsContainer}>
                    <div className={styles.Details}>
                      <p>
                        Job Title: <span>{value.jobList}</span>{" "}
                      </p>
                      <p>
                        Language: <span> {value.TypeOfLanguageJob}</span>
                      </p>
                      <p>
                        Job Location: <span> {value.cityJob} </span>
                      </p>
                      <p>
                        Job Provider: <span>{value.jobProvider}</span>
                      </p>
                    </div>
                    <div className={styles.Details}>
                      <p>
                        Job Type:<span> {value.jobType}</span>
                      </p>
                      <p>
                        salary Basis: <span>{value.salaryBasisJob}</span>
                      </p>
                      <p>
                        Start Date: <span> {value.startDateJob}</span>
                      </p>
                      <p>
                        End Date: <span> {value.endDateJob}</span>
                      </p>
                    </div>
                    <div className={styles.contactPersonDetails}>
                      <p>
                        Contact Person: <span>{value.contactPersonJob}</span>
                      </p>
                      <p>
                        Contact Number: <span>{value.contactNumberJob}</span>
                      </p>
                      <p>
                        {" "}
                        Email: <span> {value.contactEmailJob}</span>{" "}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "inline" }}>
                    <button
                      onClick={() => removeJob(value._id)}
                      className={styles.submitBtnButton}
                    >
                      <div className={styles.submitButtonDiv} />
                      <div className={styles.submitDiv}>Delete</div>
                    </button>
                    <button
                      onClick={() => changeEditMood(value)}
                      className={styles.submitBtnButton}
                    >
                      <div className={styles.submitButtonDiv} />
                      <div className={styles.submitDiv}>Edit</div>
                    </button>
                  </div>





                  {editMood && (
                    <form className={styles.accommodationForm}
                    onSubmit={submitEditJob}>
                      
                        <input
                          defaultValue={editJob.jobList}
                          className={styles.contactPersonName}
                          type="text"
                          placeholder="Job Title"
name="jobList"
                        />
                        <input
                          defaultValue={editJob.jobType}
                          className={styles.contactNumber}
                          type="text"
                          placeholder="Job Type"
                          name="jobType"
                        />

                        <input
                          defaultValue={editJob.contactPersonJob}
                          className={styles.contactPersonEmail}
                          type="text"
                          placeholder="Your Name"
                          name="contactPersonJob"
                        />
                     

                      
                        <input
                          type="text"
                          defaultValue={editJob.TypeOfLanguageJob}
                          placeholder="Language"
                          className={styles.jobPersonsNumber}
                          name="language"
                        />

                        <input
                          type="text"
                          defaultValue={editJob.salaryBasisJob}
                          placeholder="salary Basis"
                          className={styles.jobPersonsNumber}
                          name="salaryBasisJob"

                        />

                        <input
                          defaultValue={editJob.contactNumberJob}
                          className={styles.accommodationStreet}
                          type="text"
                          placeholder="Contact Number"
                          name="contactNumberJob"
                        />
                    
                    
                        <input
                          type="text"
                          defaultValue={editJob.cityJob}
                          placeholder="Select Your City"
                          className={styles.accommodationSelect}
                          name="cityJob"
                        />

                        <input
                          defaultValue={editJob.startDateJob}
                          className={styles.accommodationStreetDate}
                          type="date"
                          name="startDateJob"
                         
                        />
                        <input
                          defaultValue={editJob.contactEmailJob}
                          className={styles.contactPersonEmail}
                          type="email"
                          placeholder="Your Email"
                          name="contactEmailJob"
                        />
                    
                  
                        <input
                          defaultValue={editJob.jobProvider}
                          className={styles.accommodationStreet}
                          type="text"
                          placeholder="Job Provider"
                          name="jobProvider"
                        />

                        <input
                          defaultValue={editJob.endDateJob}
                          className={styles.accommodationStreetEnd}
                          type="date"
                          name="endDateJob"
                          id="date"
                        />
                
                      <div className={styles.accommodationSelectDiv}>
                        <button className={styles.formButton}>
                          Save changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
};
export default GetUserPostJob;
