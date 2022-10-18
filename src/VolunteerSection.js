import { useState, useRef } from "react";
import { MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./css/VolunteerSection.module.css";
import GetUserPostJob from "./GetUserPostJob";
import axios from "axios";
import GetUserPost from "./GetUserPost";
import FileBase64 from "react-file-base64";
import GetUserPostHelp from "./GetUserPostHelp";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const VolunteerSection = () => {
  //   const moveToContainer = useRef()

  // const navigateToLists=(e)=>{
  //   setVolenForm(e.target.value);

  //   moveToContainer.current.scrollIntoView({behavior: "smooth"});
  // }
  const [userAvatar, setUserAvatar] = useState(false);
  const [volenForm, setVolenForm] = useState("");

  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [city, setCity] = useState("");
  const [accomodationType, setAccomodationType] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [available, setAvailable] = useState("");
  const [image, setImage] = useState([]);

  //Helps
  const [contactNumberHelp, setContactNumberHelp] = useState("");
  const [contactEmailHelp, setContactEmailHelp] = useState("");
  const [addressHelp, setAddressHelp] = useState("");
  const [contactPersonHelp, setContactPersonHelp] = useState("");
  const [cityHelp, setCityHelp] = useState("");
  const [TypeOfLanguageHelp, setTypeOfLanguageHelp] = useState("");
  const [orgHelp, setOrgHelp] = useState("");
  const [startDateHelp, setStartDateHelp] = useState("");
  const [endDateHelp, setEndDateHelp] = useState("");
  const [helpType, setHelpType] = useState("");

  //Jobs
  const [contactNumberJob, setContactNumberJob] = useState("");
  const [contactEmailJob, setContactEmailJob] = useState("");
  const [contactPersonJob, setContactPersonJob] = useState("");
  const [cityJob, setCityJob] = useState("");
  const [TypeOfLanguageJob, setTypeOfLanguageJob] = useState("");
  const [jobProvider, setJobProvider] = useState("");
  const [startDateJob, setStartDateJob] = useState("");
  const [endDateJob, setEndDateJob] = useState("");
  const [jobList, setJobList] = useState("");
  const [salaryBasisJob, setSalaryBasisJob] = useState("");
  const [jobType, setJobType] = useState("");

  const createAccomodation = async () => {
    const data = {
      image,
      address,
      contactPerson,
      contactNumber,
      contactEmail,
      accomodationType,
      numberOfPersons,
      city,
      startDate,
      endDate,
      available,
    };

    const API = axios.create({ baseURL: "https://hopetohand-server.herokuapp.com/" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
      return req;
    });

    await API.post("/volunteerformspage/postaccommodation", data);

    setAddress("");
    setContactPerson("");
    setContactNumber("");
    setContactEmail("");
    // setImage("");
    setCity("");
    setAccomodationType("");
    setNumberOfPersons("");
    setStartDate("");
    setEndDate("");
    setAvailable("");
    setImage([]);

    // setMessage(true);
  };
  const createHelp = async () => {
    const data = {
      contactEmailHelp,
      addressHelp,
      contactPersonHelp,
      cityHelp,
      TypeOfLanguageHelp,
      orgHelp,
      startDateHelp,
      endDateHelp,
      helpType,
      contactNumberHelp,
    };

    const API = axios.create({ baseURL: "https://hopetohand-server.herokuapp.com/" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
      return req;
    });

    await API.post("/volunteerformspage/posthelp", data);

    setAddressHelp("");
    setContactPersonHelp("");
    setContactNumberHelp("");
    setContactEmailHelp("");
    // setImage("");
    setCityHelp("");
    setTypeOfLanguageHelp("");
    setOrgHelp("");
    setStartDateHelp("");
    setEndDateHelp("");
    setHelpType("");
  };

  const createJob = async () => {
    const data = {
      contactEmailJob,
      contactPersonJob,
      contactNumberJob,
      TypeOfLanguageJob,
      jobType,
      cityJob,
      jobList,
      jobProvider,
      salaryBasisJob,
      startDateJob,
      endDateJob,
    };

    const API = axios.create({ baseURL: "https://hopetohand-server.herokuapp.com/" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
      return req;
    });

    await API.post("/volunteerformspage/postjob", data);

    setContactNumberJob("");
    setContactEmailJob("");

    setContactPersonJob("");
    // setImage("");
    setCityJob("");
    setTypeOfLanguageJob("");
    setJobProvider("");
    setStartDateJob("");
    setEndDateJob("");
    setJobList("");
    setSalaryBasisJob("");
    setJobType("");
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  // console.log("Local storage: ", user.res.token);
  if (!user?.token) {
    return <div>You are not logged in</div>;
  }

  const uploadAvatar = async (e) => {
    e.preventDefault();
    console.log("avatar");
    const API = axios.create({ baseURL: "https://hopetohand-server.herokuapp.com/" });

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("profile")).token
        }`;
      }
      return req;
    });
    const data = new FormData(e.target);
    const response = await API.post("/volunteerformspage/postavatar", data);
    console.log(response.data);
    localStorage.setItem(
      "profile",
      JSON.stringify({
        userName: response.data.user.userName,
        token: JSON.parse(localStorage.getItem("profile")).token,
        avatar: response.data.user.avatar,
      })
    );
  };
  const userName = JSON.parse(localStorage.getItem("profile")).userName;
  const avatar = JSON.parse(localStorage.getItem("profile")).avatar;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className={styles.volunteerSection}>
        <div className={styles.frameDiv}>
          <article className={styles.userFrameArticle}>
            <img className={styles.profileSymbolIcon} src={avatar} alt="" />

            <button
              onClick={(e) => setUserAvatar((prev) => !prev)}
              className={styles.uploadAPhoto}
              value="userAvatar"
            >
              Change your Avatar
            </button>

            {userAvatar === true ? (
              <form
                onSubmit={uploadAvatar}
                encType="multipart/form-data"
                className={styles.avatarSection}
                value="addAvatar"
              >
                <input
                  className={styles.avatarInput}
                  type="file"
                  name="avatar"
                />
                <input
                  onChange={(e) => setUserAvatar(e.target.value)}
                  className={styles.avatarInput}
                  type="submit"
                  value="upload"
                />
              </form>
            ) : (
              ""
            )}
            <h5 className={styles.johnDoeH5}>{userName}</h5>

            <div className={styles.frameDiv3} />
          </article>

          <article className={styles.userVolunteerAboutSectionArticle}>
            <div className={styles.frameDiv4}>
              <h4 className={styles.helloVolunteerH4}>
                Hello <span>{userName}</span>!
              </h4>
              <p className={styles.weWelcomeYouInOurEndevour}>
                We welcome you in our endevour and want to thank you for joining
                hands with us and help provide more caring hands in times of
                trouble, together we can change reality much faster.
              </p>
            </div>

            <div className={styles.frameDiv5}>
              <div className={styles.skillsDiv}>
                <h6 className={styles.skillsH6}>
                  What would you like to offer?
                </h6>
                <Box sx={{ minWidth: 220, fontFamily: "Montserrat" }}>
                  <FormControl fullWidth sx={{ fontFamily: "Montserrat" }}>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      sx={{ backgroundColor: "#fff", fontFamily: "Montserrat" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={volenForm}
                      label="Age"
                      onChange={(e) => setVolenForm(e.target.value)}
                    >
                      <MenuItem
                        sx={{
                          backgroundColor: "#fff",
                          fontFamily: "Montserrat",
                        }}
                        value="accommodation"
                      >
                        Accommodation
                      </MenuItem>
                      <MenuItem
                        sx={{
                          backgroundColor: "#fff",
                          fontFamily: "Montserrat",
                        }}
                        value="Help"
                      >
                        Help
                      </MenuItem>
                      <MenuItem
                        sx={{
                          backgroundColor: "#fff",
                          fontFamily: "Montserrat",
                        }}
                        value="Job"
                      >
                        Job
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            {volenForm === "accommodation" ? (
              <form className={styles.accommodationForm}>
                <input
                  onChange={(e) => setContactPerson(e.target.value)}
                  className={styles.contactPersonName}
                  type="text"
                  placeholder="Your Name"
                />
                <input
                  onChange={(e) => setContactNumber(e.target.value)}
                  className={styles.contactPersonNumber}
                  type="string"
                  placeholder="Your Phone Number"
                />
                <input
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={styles.contactPersonEmail}
                  type="email"
                  placeholder="Your Email"
                />
                <div className={styles.accommodationSelectDiv}>
                  <div className={styles.accommodationTitles}>City</div>
                  <div className={styles.accommodationTitles}>Address</div>

                  <input
                    type="text"
                    placeholder="Select Your City"
                    className={styles.accommodationSelect}
                    list="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <datalist id="city">
                    <option value="Berlin" />
                  </datalist>

                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    className={styles.accommodationStreet}
                    type="text"
                    placeholder="Address"
                  />
                </div>
                <div className={styles.accommodationSelectDiv}>
                  <div className={styles.accommodationTitles}>
                    Type of Accommodation
                  </div>
                  <div className={styles.accommodationTitles}>
                    Number of Persons
                  </div>

                  <input
                    type="text"
                    placeholder="Your Accommodation Type"
                    className={styles.accommodationStreetEnd}
                    list="accommodation"
                    onChange={(e) => setAccomodationType(e.target.value)}
                  />
                  <datalist id="accommodation">
                    <option value="Hotel" />
                    <option value="House" />
                    <option value="Apartment" />
                    <option value="Guest House" />
                    <option value="Hostel" />
                    <option value="Chalet" />
                    <option value="Garage" />
                    <option value="Cottages" />
                  </datalist>

                  <input
                    type="text"
                    placeholder="Select Number of the Persons"
                    className={styles.accommodationStreetEnd}
                    list="persons"
                    onChange={(e) => setNumberOfPersons(e.target.value)}
                  />
                  <datalist id="persons">
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                    <option value="6" />
                    <option value="7" />
                    <option value="8" />
                  </datalist>
                </div>
                <div className={styles.accommodationSelectDiv}>
                  <div className={styles.accommodationTitles}>
                    {" "}
                    Available from
                  </div>
                  <div className={styles.accommodationTitles}> to</div>
                  <input
                    onChange={(e) => setStartDate(e.target.value)}
                    className={styles.accommodationStreetDate}
                    type="date"
                    name="date"
                    id="date"
                  />
                  <input
                    onChange={(e) => setEndDate(e.target.value)}
                    className={styles.accommodationStreetEnd}
                    type="date"
                    name="date"
                    id="date"
                  />

                  <input
                    type="text"
                    placeholder="Status"
                    className={styles.accommodationStreetEnd}
                    list="available"
                    onChange={(e) => setAvailable(e.target.value)}
                  />
                  <datalist id="available">
                    <option value="Available" />
                    <option value="soon will be available" />
                    <option value="reserved" />
                  </datalist>
                </div>

                <div className={styles.accommodationSelectDiv}>
                  <FileBase64
                    multiple={true}
                    onDone={(files) => {
                      setImage(files.map((file) => file.base64));
                    }}
                  />
                </div>
 


                <div className={styles.helpSelectDiv}>
                  <button
                    onClick={createAccomodation}
                    className={styles.formButton}
                  >
                    {" "}
                    submit
                  </button>
                </div>
              </form>
            ) : volenForm === "Job" ? (
              <form className={styles.jobForm}>
                <input
                  onChange={(e) => setContactPersonJob(e.target.value)}
                  className={styles.contactPersonName}
                  type="text"
                  placeholder="Contact Person Name"
                />
                <input
                  onChange={(e) => setContactNumberJob(e.target.value)}
                  className={styles.contactPersonNumber}
                  type="string"
                  placeholder="Contact Person Number"
                />
                <input
                  onChange={(e) => setContactEmailJob(e.target.value)}
                  className={styles.contactPersonEmail}
                  type="email"
                  placeholder="Contact Person Email"
                />

                <div className={styles.jobSelectDiv}>
                  <div className={styles.jobTitles}>Job Location</div>
                  <div className={styles.jobTitles}>Job Provider</div>
                  <input
                    type="text"
                    placeholder="Select Your City"
                    className={styles.accommodationSelect}
                    list="city"
                    onChange={(e) => setCityJob(e.target.value)}
                  />
                  <datalist id="city">
                    <option value="Berlin" />
                  </datalist>
                  <input
                    onChange={(e) => setJobProvider(e.target.value)}
                    className={styles.accommodationSelect}
                    type="text"
                    placeholder="Person/Company/Organization Name"
                  />
                </div>
                <div className={styles.jobSelectDiv}>
                  <div className={styles.jobTitles}>Language</div>
                  <div className={styles.jobTitles}>Job List</div>

                  <input
                    type="text"
                    placeholder="Select or Write your Language"
                    className={styles.accommodationSelect}
                    list="language"
                    onChange={(e) => setTypeOfLanguageJob(e.target.value)}
                  />
                  <datalist id="language">
                    <option value="Germany" />
                    <option value="English" />
                    <option value="Russian" />
                    <option value="Arabic" />
                    <option value="Persian" />
                  </datalist>

                  <input
                    type="text"
                    placeholder="Select or Write your Job"
                    className={styles.accommodationSelect}
                    list="jobLists"
                    onChange={(e) => setJobList(e.target.value)}
                  />
                  <datalist id="jobLists">
                    <option value="Store" />
                    <option value="Housekeeper" />
                    <option value="Security Guard" />
                    <option value="Housekeeping Technician" />
                    <option value="Gardner" />
                    <option value="Cleaner" />
                  </datalist>
                </div>
                <div className={styles.jobSelectDiv}>
                  <div className={styles.jobTitles}>Job Type</div>
                  <div className={styles.jobTitles}>Salary Basis</div>

                  <input
                    type="text"
                    placeholder="Select the Job Type"
                    className={styles.accommodationSelect}
                    list="JobType"
                    onChange={(e) => setJobType(e.target.value)}
                  />
                  <datalist id="JobType">
                    <option value="Full time" />
                    <option value="Part Time" />
                  </datalist>

                  <input
                    type="text"
                    placeholder="Select the Salary Basis"
                    className={styles.accommodationSelect}
                    list="Salary"
                    onChange={(e) => setSalaryBasisJob(e.target.value)}
                  />
                  <datalist id="Salary">
                    <option value="Monthly" />
                    <option value="Weekly" />
                    <option value="Daily" />
                    <option value="Hourly" />
                  </datalist>

                </div>
                <div className={styles.jobSelectDiv}>
                  <div className={styles.jobTitles}> Contract Start Date:</div>
                  <div className={styles.jobTitles}> Contract Finish Date:</div>
                  <input
                    onChange={(e) => setStartDateJob(e.target.value)}
                    className={styles.accommodationSelect}
                    type="date"
                    name="date"
                    id="date"
                  />
                  <input
                    onChange={(e) => setEndDateJob(e.target.value)}
                    className={styles.accommodationSelect}
                    type="date"
                    name="date"
                    id="date"
                  />
                </div>

        
                <div className={styles.jobSelectDiv}>
                  <button onClick={createJob} className={styles.formButton}>
                    {" "}
                    submit
                  </button>
                </div>
              </form>


            ) : volenForm === "Help" ? (
              <form className={styles.helpForm}>
                <input
                  onChange={(e) => setContactPersonHelp(e.target.value)}
                  className={styles.contactPersonName}
                  type="text"
                  placeholder="Contact Person Name"
                />
                <input
                  onChange={(e) => setContactNumberHelp(e.target.value)}
                  className={styles.contactPersonNumber}
                  type="number"
                  placeholder="Contact Person Number"
                 
                />
                <input
                  onChange={(e) => setContactEmailHelp(e.target.value)}
                  className={styles.contactPersonEmail}
                  type="email"
                  placeholder="Contact Person Email"
                />
                <div className={styles.helpSelectDiv}>
                  <div className={styles.helpTitles}>Activity location</div>
                  <div className={styles.helpTitles}>Helper</div>

                  <input
                    type="text"
                    placeholder="Select Your City"
                    className={styles.accommodationSelect}
                    list="city"
                    onChange={(e) => setCityHelp(e.target.value)}
                  />
                  <datalist id="city">
                    <option value="Berlin" />
                  </datalist>

                  <input
                    onChange={(e) => setOrgHelp(e.target.value)}
                    className={styles.accommodationStreetEnd}
                    type="text"
                    placeholder="Person/Company/Organization"
                  />
                </div>
                <div className={styles.helpSelectDiv}>
                  <div className={styles.helpTitles}>Language</div>
                  <div className={styles.helpTitles}>Helping type</div>

                  <input
                    type="text"
                    placeholder="Select or Write your Language"
                    className={styles.accommodationSelect}
                    list="language"
                    onChange={(e) => setTypeOfLanguageHelp(e.target.value)}
                  />
                  <datalist id="language">
                    <option value="Germany" />
                    <option value="English" />
                    <option value="Russian" />
                    <option value="Arabic" />
                    <option value="Persian" />
                  </datalist>

                  <input
                    type="text"
                    placeholder="Select Helping Type"
                    className={styles.accommodationSelect}
                    list="helping"
                    onChange={(e) => setHelpType(e.target.value)}
                  />
                  <datalist id="helping">
                    <option value="Interpretation" />
                    <option value="Translation" />
                    <option value="finding Integration Course" />
                    <option value="finding nursery school" />
                  </datalist>

                </div>
                <div className={styles.helpSelectDiv}>
                  <div className={styles.helpTitles}>
                    {" "}
                    Cooperation Start Date:
                  </div>
                  <div className={styles.helpTitles}>
                    {" "}
                    Cooperation Finish Date:
                  </div>
                  <input
                    onChange={(e) => setStartDateHelp(e.target.value)}
                    className={styles.accommodationStreetDate}
                    type="date"
                    name="date"
                    id="date"
                  />
                  <input
                    onChange={(e) => setEndDateHelp(e.target.value)}
                    className={styles.accommodationStreetEnd}
                    type="date"
                    name="date"
                    id="date"
                  />
                </div>



                <div className={styles.helpSelectDiv}>
                  <button onClick={createHelp} 
                  className={styles.formButton}>
                    {" "}
                    submit
                  </button>
                </div>
              </form>
            ) : (


              volenForm == null
            )}
            <GetUserPost />
            <GetUserPostHelp />
            <GetUserPostJob />
          </article>
        </div>
      </section>
    </LocalizationProvider>
  );
};
