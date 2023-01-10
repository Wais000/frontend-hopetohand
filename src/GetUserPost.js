import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./css/ProfileSection.module.css";

const GetUserPost = () => {
  const [request, setRequest] = useState();
  const [details, setDetails] = useState();
  const [editMood, setEditMood] = useState(false);
  const [editAccommodation, setEditAccommodation] = useState(null);

  const API = axios.create({ baseURL: "https://backend-hopetohand.onrender.com/" });

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
    //console.log("Clicked!");
    const response = await API.get("/getuseraccomodations");
    console.log(response.data);
    setDetails(response.data);
    setRequest("GET");
  };

  useEffect(() => {
    getRequestHandler();
    console.log("pressed!");
  }, []);

  const removeAccommodation = async (id) => {
    try {
      const response = await API.delete(`/deleteuseraccommodation/${id}`);
      console.log(response);
      getRequestHandler();
    } catch (error) {
      alert(error);
    }
  };

  if (!user?.token) {
    return <div>You are not logged in</div>;
  }

  const submitEditAccommodation = async (e) => {
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
        `https://backend-hopetohand.onrender.com//updateaccomodation/${editAccommodation._id}`,
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
    setEditAccommodation(item);
    setEditMood(true);
  };
  console.log(editAccommodation);
  return (
    <>
      {request
        ? details.map((value) => {
            return (
              <div className={styles.accommodationMainContainer}>
                <h4 className={styles.title}>Your Accommodation List:</h4>
                <div className={styles.Container} key={value._id}>
                  <div className={styles.detailsContainer}>
                    <div className={styles.contactPersonDetails}>
                      <p>
                        Contact Person: <span>{value.contactPerson}</span>
                      </p>
                      <p>
                        Phone Number: <span>{value.contactNumber}</span>
                      </p>
                      <p>
                        Email: <span>{value.contactEmail}</span>
                      </p>
                    </div>
                    <div className={styles.Details}>
                      <p>
                        Accommodation Type:{" "}
                        <span>{value.accomodationType}</span>{" "}
                      </p>
                      <p>
                        Number of Persons: <span> {value.numberOfPersons}</span>
                      </p>
                      <p>
                        Address:{" "}
                        <span>
                          {value.address}, {value.city}
                        </span>
                      </p>
                    </div>
                    <div className={styles.Available}>
                      <p>
                        {" "}
                        Available from:<span> {value.startDate}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        to: <span>{value.endDate} </span>
                      </p>
                      <p>
                        Status:<span> {value.available}</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.ImgContainer}>
                    {value.image.length >= 0
                      ? value.image.map((img) => (
                          <img className={styles.ImgDiv} src={img} alt="" />
                        ))
                      : "No image"}
                  </div>
                  <div className={styles.buttonDiv}>
                    <button
                      onClick={() => removeAccommodation(value._id)}
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
                      onSubmit={submitEditAccommodation}
                    >
                      <input
                        defaultValue={editAccommodation.contactPerson}
                        className={styles.accommodationInput}
                        type="text"
                        placeholder="Your Name"
                        name="contactPerson"
                      />
                      <input

                        defaultValue={editAccommodation.contactNumber}
                        className={styles.accommodationInput}
                        type="string"
                        placeholder="Your Phone Number"
                        name="contactNumber"
                      />
                      <input
                        defaultValue={editAccommodation.contactEmail}
                        className={styles.accommodationInput}
                        type="email"
                        placeholder="Your Email"
                        name="contactEmail"
                      />


                      <input
                        type="text"
                        defaultValue={editAccommodation.city}
                        placeholder="Select Your City"
                        className={styles.accommodationInput}
                        name="city"
                      />
                      <datalist id="city">
                        <option value="Berlin" />
                      </datalist>

                      <input
                        defaultValue={editAccommodation.address}
                        className={styles.accommodationInput}
                        type="text"
                        placeholder="Address"
                        name="address"
                        id="Address"
                      />

                      <input
                        type="text"
                        defaultValue={editAccommodation.accomodationType}
                        placeholder="Your Accommodation Type"
                        className={styles.jobPersonsNumber}
                        name="accomodationType"
                      />

                      <input
                        defaultValue={editAccommodation.numberOfPersons}
                        type="text"
                        placeholder="Number of Persons"
                        className={styles.accommodationInput}
                        name="numberOfPersons"
                      />

                      <input
                        defaultValue={editAccommodation.startDate}
                        className={styles.accommodationInput}
                        type="date"
                        name="startDate"
                        id="startDate"
                      />
                      <input
                        defaultValue={editAccommodation.endDate}
                        className={styles.accommodationInput}
                        type="date"
                        name="endDate"
                      />

                      <input
                        type="text"
                        defaultValue={editAccommodation.available}
                        placeholder="Status"
                        className={styles.accommodationInput}
                        name="available"
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

export default GetUserPost;
