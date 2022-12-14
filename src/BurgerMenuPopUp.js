import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/BurgerMenuPopUp.module.css";

export const BurgerMenuPopUp = ({ onClose }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const myProfileButtonClick = useCallback(() => {
    navigate("/volunteerformspage");
  }, [navigate]);

  const onFindSupportButtonClick = useCallback(() => {
    navigate("/findsupportpage");
  }, [navigate]);

  const onPartnersButtonClick = useCallback(() => {
    navigate("/geolocsearchpage");
  }, [navigate]);

  const onAboutUsButtonClick = useCallback(() => {
    navigate("/aboutuspage");
  }, [navigate]);

  const onContactUsButtonClick = useCallback(() => {
    navigate("/aboutuspage");
  }, [navigate]);
  const donationUsButtonClick = useCallback(() => {
    navigate("/donationpage");
  }, [navigate]);


  return (
    <div className={styles.burgerMenuPopUpDiv}>
      <div className={styles.frameDiv}>
        <h4 className={styles.menuH4}>Menu</h4>
        <button className={styles.closeButton} onClick={onClose}>
          <img className={styles.ellipseIcon} alt="" src="ellipse-225.svg" />
          <img className={styles.lineIcon} alt="" src="line-8.svg" />
          <img className={styles.lineIcon1} alt="" src="line-9.svg" />
        </button>
      </div>
      <a className={styles.headerNavigations}>
        <button
          className={styles.findSupportButton}
          onClick={onFindSupportButtonClick}
        >
          Find Support
        </button>
        <button
          className={styles.findSupportButton}
          onClick={onPartnersButtonClick}
        >
Institutions        </button>
        <button className={styles.aboutUsButton} onClick={onAboutUsButtonClick}>
          About Us
        </button>
        <button
          className={styles.contactUsButton}
          onClick={onContactUsButtonClick}
        >
          Contact Us
        </button>
        <button
       onClick={donationUsButtonClick}
          className={styles.contactUsButton}
      
        >
          Donation
        </button>
        {user ? <button
    className={styles.contactUsButton}
    onClick={myProfileButtonClick}
  >
    My Profile
  </button>: ""}
      </a>
    </div>
  );
};
