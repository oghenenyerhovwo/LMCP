import { Link } from '../../../node_modules/react-router-dom/index'

import styles from "./footer.module.css"

import { FaFacebook } from "react-icons/fa"

const Footer = () => {

  return (
    <div className={styles.footer}>
      
      <div className={`container ${styles.footer_container}`}> 

        <h4 className="spacing-md">YOMM TO THE WORLD</h4>
        
        <div className={`${styles.links} spacing-md`}>
          <Link className={`spacing-sm ${styles.footer_link}`} to={"#"}>SUPPORT</Link>
          <Link className={`spacing-sm ${styles.footer_link}`} to={"#"}>SUPPORT</Link>
          <Link className={`spacing-sm ${styles.footer_link}`} to={"#"}>SUPPORT</Link>
        </div>

        <div className={`${styles.connect}`}>
          <h5 className="spacing-md">Connect with Us</h5>
          <Link className={`spacing-sm flex flex__center ${styles.footer_link}`} to={"#"}>Facebook <FaFacebook /></Link>
          <Link className={`spacing-sm ${styles.footer_link}`} to={"#"}>Email</Link>
        </div>

      </div>      
      
      </div>
  )
}

export default Footer