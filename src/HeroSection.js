import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/HeroSection.module.css";
import {MdOutlineTravelExplore} from "react-icons/md"
import {SiHomebridge} from "react-icons/si"
import {MdConnectWithoutContact} from "react-icons/md"
import {FaHandsHelping} from "react-icons/fa"


export const HeroSection = () => {
  const navigate = useNavigate();

  const onFINDButtonClick = useCallback(() => {
    navigate("/findsupportpage");
  }, [navigate]);

  return (
    <section className={styles.heroSection}>
      <section className={styles.heroSection1}>
        <h1 className={styles.hOPE2HANDBERLINH1}>
          <p className={styles.hOPE2HAND}>HOPE2HAND</p>
          <p className={styles.bERLINP}>BERLIN</p>
        </h1>
        <article className={styles.searchHeadersArticle}>
          <button className={styles.fINDButton} onClick={onFINDButtonClick}>
            FIND
          </button>
          <div className={styles.searchOptionsDiv}>
            <ul className={styles.findOptions}>

<li className={styles.find}> <a className={styles.links}>Accommodations</a>  <span className={styles.icons}> <SiHomebridge/></span></li>
<li className={styles.find}> <a className={styles.links} >Helpers</a>  <span className={styles.icons}> <FaHandsHelping/></span></li>
<li className={styles.find}> <a className={styles.links} > Jobs</a> <span className={styles.icons}><MdConnectWithoutContact/></span></li>
<li className={styles.find}> <a className={styles.links} > Institutions</a> <span className={styles.icons}> <MdOutlineTravelExplore/></span></li>


            </ul>

          </div>
        </article>
      </section>
    </section>
  );
};
