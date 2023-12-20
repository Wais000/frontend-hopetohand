import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./css/ProfileSection.module.css";

const GetUserPostHelp = () => {
  const [request, setRequest] = useState();
  const [details, setDetails] = useState();
  const [editMood, setEditMood] = useState(false);
  const [editHelp, setEditHelp] = useState(null);

  const API = axios.create({ baseURL: "https://backend-hopetohand.onrender.com/volunteerformspage/posthelp" });

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
    const response = await API.get("/getuserhelp");
    console.log(response.data);
    setDetails(response.data);
    setRequest("GET");
  };

  useEffect(() => {
    getRequestHandler();
  }, []);

  const removeHelp = async (id) => {
    try {
      const response = await API.delete(`/deleteuserhelp/${id}`);
      console.log(response);
      getRequestHandler();
    } catch (error) {
      alert(error);
    }
  };

  if (!user?.token) {
    return <div>You are not logged in</div>;
  }
  //  submitEditHelp
  const submitEditHelp = async (e) => {
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
        `https://backend-hopetohand.onrender.com/updatehelp/${editHelp._id}`,
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
    setEditHelp(item);
    setEditMood(true);
  };

  return (
    <>
      {/* <PostStatus/> */}

      {request
        ? details.map((value) => {
            return (
              <div className={styles.accommodationMainContainer}>
                <h4 className={styles.title}>Your Help List:</h4>
                <div className={styles.Container} key={value._id}>
                  <div className={styles.detailsContainer}>
                    <div className={styles.Details}>
                      <p>
                        Cooperation type: <span>{value.helpType}</span>{" "}
                      </p>
                      <p>
                        Cooperation City: <span> {value.cityHelp} </span>
                      </p>
                      <p>
                        Organization: <span>{value.orgHelp}</span>
                      </p>
                    </div>
                    <div className={styles.Details}>
                      <p>
                        Language: <span> {value.TypeOfLanguageHelp}</span>
                      </p>
                      <p>
                       Contact Person:<span> {value.contactPersonHelp}</span>
                      </p>
                      <p>
                        Phone Number: <span>{value.contactNumberHelp}</span>
                      </p>
                    </div>
                    <div className={styles.Available}>
                      <p>
                        Email: <span>{value.contactEmailHelp}</span>
                      </p>
                      <p>
                        {" "}
                        Valid From: <span> {value.startDateHelp}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        to: <span>{value.endDateHelp} </span>{" "}
                      </p>
                    </div>
                  </div>

                  <div className={styles.bottomDelete}>
                    <button
                      onClick={() => removeHelp(value._id)}
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
                    <form
                      className={styles.accommodationForm}
                      onSubmit={submitEditHelp}
                    >
                      <input
                        defaultValue={editHelp.helpType}
                        className={styles.HelpInput}
                        type="text"
                        placeholder="Cooperation type"
                        name="helpType"
                      />
                      <input
                        type="text"
                        defaultValue={editHelp.TypeOfLanguageHelp}
                        placeholder="Language"
                        className={styles.HelpInput}
                        name="TypeOfLanguageHelp"
                      />

                      <input
                        defaultValue={editHelp.contactEmailHelp}
                        className={styles.HelpInput}
                        type="email"
                        placeholder="Your Email"
                        name="contactEmailHelp"
                      />

                      <input
                        type="text"
                        defaultValue={editHelp.cityHelp}
                        placeholder="Cooperation City"
                        className={styles.HelpInput}
                        name="cityHelp"
                      />

                      <input
                        type="text"
                        defaultValue={editHelp.contactPersonHelp}
                        placeholder="contact Person"
                        className={styles.HelpInput}
                        name="contactPersonHelp"
                      />

                      <input
                        defaultValue={editHelp.startDateHelp}
                        className={styles.HelpInput}
                        type="date"
                        id="date"
                        name="startDateHelp"
                      />

                      <input
                        type="text"
                        defaultValue={editHelp.orgHelp}
                        placeholder="Organization"
                        className={styles.HelpInput}
                        name="orgHelp"
                      />

                      <input
                        defaultValue={editHelp.contactNumberHelp}
                        className={styles.HelpInput}
                        placeholder="Phone Number"
                        type="number"
                        name="contactNumberHelp"
                    
                      />
                      <input
                        defaultValue={editHelp.endDateHelp}
                        className={styles.HelpInput}
                        type="date"
                        name="endDateHelp"
                       
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
export default GetUserPostHelp;
