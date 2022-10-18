import styles from "./css/AboutTeamSection.module.css";
import { useRef } from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AboutTeamSection = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const myNavigate = useNavigate();

  const onLHomeContainerClick = useCallback(() => {
    myNavigate("/");
  }, [myNavigate]);

  const postRequestHandler = async () => {
    const data = { name, phoneNumber, companyName, email, message };
    console.log(data);
    await axios.post("https://hopetohand-server.herokuapp.com//contactform", data);
    setName("");
    setPhoneNumber("");
    setCompanyName("");
    setEmail("");
    setMessage("");
  };

  const reference = useRef();
  return (
    <section
      className={styles.aboutTeamSection}
      ref={reference}
      id="AboutTeamSection"
    >
      <h3 className={styles.whatToDo}>{`What do we do? `}</h3>
      <p className={styles.AboutText}>
        We live in a troublesome world with always new humanitarian crisis and
        impending emergencies, but at the core of the most intrinsic of human
        qualities resides the immediate desire to make everything good again and
        provide helping hands wherever needed. So our mission is to provide a
        platform, a common ground where all those willing hands can gather and
        reach out to make hope a reality. Join us or support us in the effort to
        make of this a better world.
      </p>
      <h4 className={styles.theWebDeveloperTeamBehind}>
        The Web Developer Team behind Hope2Hand!
      </h4>

      <div className={styles.teamBoxes}>
        <div className={styles.teams}>
          <img className={styles.teamIcon} alt="" src="../felix@2x.png" />
          <div className={styles.details}>
            <p className={styles.title}>Felix Chirinos</p>
            <p className={styles.text}>Backend Engineer</p>
          </div>
        </div>

        <div className={styles.teams}>
          <img className={styles.teamIcon} alt="" src="../wais@2x.png" />
          <div className={styles.details}>
            <p className={styles.title}>Wais Nazari</p>
            <p className={styles.text}>Project Manager</p>
            <p className={styles.text}>Frontend Engineer</p>
            <p className={styles.text}>Backend Engineer</p>
            <p className={styles.text}>UI/UX Prototyper</p>
          </div>
        </div>

        <div className={styles.teams}>
          <img className={styles.teamIcon} alt="" src="../paul@2x.png" />
          <div className={styles.details}>
            <p className={styles.title}>Paul Desbats</p>
            <p className={styles.text}>Project Manager</p>
            <p className={styles.text}>Frontend Engineer</p>
            <p className={styles.text}>UI/UX Prototyper</p>
          </div>
        </div>

        <div className={styles.teams}>
          <img className={styles.teamIcon} alt="" src="../carlos@2x.png" />
          <div className={styles.details}>
            <p className={styles.title}>Carlos Pereira</p>
            <p className={styles.text}>Backend Engineer</p>
          </div>
        </div>

        <div className={styles.teams}>
          <img className={styles.teamIcon} alt="" src="../gerald@2x.png" />
          <div className={styles.details}>
            <p className={styles.title}>Gerald Ehidom</p>
            <p className={styles.text}>Frontend Engineer</p>
          </div>
        </div>
      </div>

      <div className={styles.infoDiv}>
        <p className={styles.visitOurTeamOrganizationAt}>
          find the hopetohand's Repositories:   
          <a className={styles.github} href="https://github.com/Wais000/frontend-hopetohand" target="_blank">
          Frontend
          </a>
          <span> / </span>
      
          <a className={styles.github} href="https://github.com/Wais000/backend-hopetohand" target="_blank">
          Backend
          </a>
        </p>
 
      </div>


{/* contact us form section */}


<div className={styles.contactFormContainer} id="contactform">
  <p className={styles.formHeader} >
  If you have any comments or questions about this website or Team Members in general, feel free to contact us.</p> 
      <form className={styles.contactForm2} >
        <h4 className={styles.formTitle}>Please Use Contact Us Here!</h4>

        <div className={styles.contactLeft}>
          <input
            onChange={(e) => setName(e.target.value)}
            className={styles.inputComponent}
            type="text"
            placeholder="Your Name"
          />

          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.inputComponent}
            type="text"
            placeholder="Your Phone Number"
          />
        </div>

        <div className={styles.contactRight}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputComponent}
            type="text"
            placeholder="Your Email"
          />
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            className={styles.inputComponent}
            type="text"
            placeholder="Your Company Name"
          />
            </div>

          <div className={styles.contactLeft2}>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              className={styles.inputComponentTextarea}
              placeholder="Tap Your Message Here..."
            />
          </div>
      
        <div className={styles.contactRight2}>
            <img onClick={onLHomeContainerClick} className={styles.vectorIcon} alt="" src="logomain.svg" />
            <b className={styles.vectorIcon}>HOPE2HAND</b>
        </div>

        <div className={styles.contactLeft3}>
          
            <button
              onClick={postRequestHandler}
              className={styles.submitBtnButton}
            >
            
             Submit
            </button>
         
        </div>
      </form>
      </div>
    </section>
  );
};

export default AboutTeamSection;
