import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Footer.module.css";
import {FaFacebookSquare} from "react-icons/fa"
import {FaInstagramSquare} from "react-icons/fa"
import {FaTwitterSquare} from "react-icons/fa"
import {FaLinkedin} from "react-icons/fa"

export const Footer = () => {
  const navigate = useNavigate();

  const onCompanyContainerClick = useCallback(() => {
    navigate("/aboutuspage");
  }, [navigate]);
  const onGeoLocContainerClick = useCallback(() => {
    navigate("/aboutuspage");
  }, [navigate]);

  const onFindAHelperClick = useCallback(() => {
    navigate("/findsupportpage");
  }, [navigate]);

  return (
    <footer className={styles.footer}>
      <section className={styles.footermainSection}>
        <img className={styles.logoIcon} alt="" src="../logo@2x.png" />
        <main className={styles.footerlinksMain}>
          <div className={styles.companyDiv} onClick={onCompanyContainerClick}>
            <h4 className={styles.cOMPANYH4}>COMPANY</h4>
            <p className={styles.aboutUsP}>About Us</p>
            <p className={styles.legalInformationP} onClick={onGeoLocContainerClick}> <a className={styles.externalLinks} href="#legalMention">Legal Information </a></p>
            <p className={styles.contactUsP} onClick={onGeoLocContainerClick}> <a className={styles.externalLinks} href="#contactform"> Contact Us </a>   </p>
          </div>
          <div className={styles.helpCenterDiv}>
            <h4 className={styles.hELPCENTERH4}>HELP CENTER</h4>
            <p className={styles.findAHelper} onClick={onFindAHelperClick}> <a className={styles.externalLinks} href="#helpers">              Find a Helper
</a>  
            </p>
            <p className={styles.howToHost}>How To Host?</p>
            <p className={styles.whyVolunteeringP}>Why Volunteering?</p>
          </div>
          <div className={styles.contactInfoDiv}>
            <h4 className={styles.cONTACTINFOH4}>CONTACT INFO</h4>
            <div className={styles.contactItemsDiv}>
              <p className={styles.emailContacthope2handio}>
                Phone: +49 3360033400
              </p>
              <p className={styles.emailContacthope2handio}>
                Email: contact@hope2hand.io
              </p>
              <p className={styles.emailContacthope2handio}>
                Location: Smartstrasse, Berlin, DE
              </p>
            </div>
            <article className={styles.socialMediaLinks} id="social links">
             <h2 className={styles.socialIconsFac}>
              <FaFacebookSquare/>
            </h2> 
            
            <h2 className={styles.socialIconsIns}>
              <FaInstagramSquare/>
            </h2> 
            <h2 className={styles.socialIconsTwi}>
              <FaTwitterSquare/>
            </h2> 
            <h2 className={styles.socialIconsLin}>
              <FaLinkedin/>
            </h2> 

            </article>
          </div>
          <div className={styles.rectangleDiv} />
          <div className={styles.rectangleDiv1} />
        </main>
      </section>
      <address className={styles.copyrightsAddress}>
        <p className={styles.hope2HandAllRightsReserve}>
          © 2022 Hope2Hand | All rights reserved
        </p>
        <p className={styles.createdWithLoveByTheThird}>
          <span>{`Created `}</span>
          <span className={styles.withSpan}>with</span>
          <span> love by The Third Team</span>
        </p>
      </address>
    </footer>
  );
};