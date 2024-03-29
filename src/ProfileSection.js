import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@mui/material";
import styles from "./css/ProfileSection.module.css";
import { useState } from "react";
import axios from "axios";








export const ProfileSection = () => {
  const [menu, setMenu] = useState("");
 const [request, setRequest] = useState();
  const [details, setDetails] = useState();
  const [detailsHelp, setDetailsHelp] = useState();
  const [detailsJob, setDetailsJob] = useState();




  const getRequestHandler = async () => {
    const response = await axios.get("https://busy-duck-wear.cyclic.app/getaccomodations");
    console.log(response.data.data);
    setDetails(response.data.data);
    setRequest("GET");
  };

  const getRequestHandlerHelp = async () => {
    const response = await axios.get("https://busy-duck-wear.cyclic.app/gethelper");
    console.log(response.data.data);
    setDetailsHelp(response.data.data);
    setRequest("GET");
  };

  const getRequestHandlerJob = async () => {
    const response = await axios.get("https://busy-duck-wear.cyclic.app/getjob");
    console.log(response.data.data);
    setDetailsJob(response.data.data);
    setRequest("GET");
  };


  return (
    <div className={styles.formContainer} >
      <form className={styles.profileSectionForm}>
        <img
          className={styles.imgSeekerFormIcon}
          alt=""
          src="imgseekerform@2x.png"
        />
        <article className={styles.formRegistrationBgArticle}>
          <div className={styles.frameDiv}>
            <div className={styles.frameDiv1}>
              <h5 className={styles.whatAreYouLookingFor}>
                What are you looking for ?
              </h5>
              <FormControl
                className={styles.inputFormControl}
                sx={{ width: 280 }}
                variant="outlined"
              >
                <InputLabel className={styles.subMenu} color="secondary">Select Here</InputLabel>
                <Select sx={{fontFamily:'Montserrat'}}
                  onChange={(e) => setMenu(e.target.value)}
                  color="secondary"
                  size="2x"
                  label="Select Here"
                >
                  <MenuItem className={styles.subMenu} onClick={getRequestHandler} value="accommodation">Accommodations</MenuItem>
                  <MenuItem className={styles.subMenu} onClick={getRequestHandlerJob} value="Job">Jobs</MenuItem>
                  <MenuItem className={styles.subMenu} onClick={getRequestHandlerHelp} value="Helpers">Helpers</MenuItem>

                </Select>
                <FormHelperText />
              </FormControl>
            </div>
            <div className={styles.logoDiv}>
              <img className={styles.logoMainIcon} alt="" src="logomain7.svg" />
            </div>
          </div>

        </article>



      </form>

      {menu === "accommodation" ? (

        <div>
          <>
            <div className={styles.accommodationMainContainer}>
              <h2 className={styles.title}> Accommodations List:</h2>


              {request
                ? details?.map((value) => {
                  return (
                    <div className={styles.Container} key={value._id}>
                      <div className={styles.detailsContainer}>
                        <div className={styles.Details}>
                          <p>contact Person: <span> {value.contactPerson}</span></p>
                          <p>Phone Number: <span> {value.contactNumber}</span> </p>
                          <p>Email: <span>  {value.contactEmail}</span></p>
                        </div>
                        <div className={styles.Details}>
                          <p>Accommodation Type:<span> {value.accomodationType} </span> </p>
                          <p>Number of Persons:<span>  {value.numberOfPersons}</span></p>
                          <p>Address: <span>{value.address}, {value.city}  </span></p>
                        </div>
                        <div className={styles.Available}>
                          <p>Available from:<span>  {value.startDate} </span></p>
                          <p>to: <span>  {value.endDate}</span> </p>
                          <p>Status:  <span>{value.available}</span>  </p>
                        </div>
                      </div>
                      <div className={styles.ImgContainer}>

                        {

                          value.image.length >= 0 ? (
                            value.image.map((img) =>


                              <img className={styles.ImgDiv} src={img} alt="" />

                            )
                          ) : "No image"


                        }


                      </div>
                    </div>


                  );
                })
                : ""}
            </div>



          </>
        </div>
      ) : menu === "Helpers" ? (
        <div  >
          <div className={styles.accommodationMainContainer} >
            <h2  className={styles.title} >Helper List:</h2>

            {request
              ? detailsHelp?.map((value) => {
                return (
                    <div className={styles.Container}  key={value._id}>
                      <div  className={styles.detailsContainer}> 

                      <div className={styles.Details}>
                      <p>Cooperation type: <span>{value.helpType}</span>  </p>
                      <p>Cooperation City: <span> {value.cityHelp} </span></p>
                      <p>Organization: <span>{value.orgHelp}</span></p>
                      </div> 
                      <div className={styles.Details}>
                      <p>Language: <span> {value.TypeOfLanguageHelp}</span></p>
                      <p>contact Person:<span> {value.contactPersonHelp}</span></p>
                      <p>Phone Number: <span>{value.contactNumberHelp}</span></p>
                      </div>
                      <div className={styles.Available}>
                      <p>Email: <span>{value.contactEmailHelp}</span></p>
                      <p> Valid From: <span> {value.startDateHelp}</span> </p>
                      <p> to: <span>{value.endDateHelp} </span> </p>
                      </div>
                    </div>
                  </div>


                );
              })
              : ""}
          </div>

        </div>
      ) : menu === "Job" ? (
<div  >
        <div className={styles.accommodationMainContainer} >
          <h2  className={styles.title} >Jobs List</h2>
          {request
            ? detailsJob?.map((value) => {
              return (
                  <div className={styles.Container}  key={value._id}>
                    <div  className={styles.detailsContainer}>
                    <div className={styles.Details}>
                    <p>Job Title: <span>{value.jobList}</span>  </p>
                    <p>Language: <span> {value.TypeOfLanguageJob}</span></p>
                    <p>Job Location: <span> {value.cityJob} </span></p>
                    <p>Job Provider: <span>{value.jobProvider}</span></p>
                    </div>
                    <div className={styles.Details}>
                    <p>Job Type:<span> {value.jobType}</span></p>
                    <p>salary Basis: <span>{value.salaryBasisJob}</span></p>
                    <p>Start Date: <span> {value.startDateJob}</span></p>
                    <p>End Date: <span> {value.endDateJob}</span></p>
                    </div>
                    <div className={styles.Available}>
                    <p>Contact Person: <span>{value.contactPersonJob}</span></p>
                    <p>Contact Number: <span>{value.contactNumberJob}</span></p>
                    <p> Email: <span> {value.contactEmailJob}</span> </p>
                    </div>
                  </div>
                </div>
              );
            })
            : ""}
        </div>
      </div>

      ) : (
        menu == null
      )}

    </div>


  );
};

