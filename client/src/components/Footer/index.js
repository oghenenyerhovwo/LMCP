import { Link } from '../../../node_modules/react-router-dom/index'

import styles from "./footer.module.css"

import { GrFacebookOption } from "react-icons/gr"
import { BsTwitter } from "react-icons/bs"

const Footer = props => {

  const facebookLink = "htps://m.facebook.com/LMCP-Lay-Missionaries-of-Christ-to-the-Poor-101140756065571"
  const twitterLink = "missiolmcp@gmai.com"

  return (
    <div className={styles.footer}>
      <div>{props.children} </div>
      <div className={`container ${styles.footer_container}`}> 

        <h4 className="spacing-md">LMCP TO THE WORLD</h4>
        
        <div className={`${styles.links} spacing-md`}>
          <Link className={`spacing-sm ${styles.footer_link}`} to="/support">SUPPORT</Link>
          <Link className={`spacing-sm ${styles.footer_link}`} to="/membership">MEMBERSHIP</Link>
          <Link className={`spacing-sm ${styles.footer_link}`} to="/team">MEET THE TEAM</Link>
        </div>

        <div className={`${styles.connect} flex flex__column`}>
          {/* <h5 className="spacing-md">Contact</h5> */}
          {/* <Link className={`spacing-sm flex flex__center ${styles.footer_link}`} to={"#"}>Facebook <GrFacebookOption /></Link> */}
          <div className={`flex ${styles.connect_mobile} spacing-md`}>
            <h4 className="spacing-sm">Mobile Number: </h4>
            <ul>
              <li className="spacing-xs"> <a href="tel: +2347035229504">+2347035229504</a> </li>
              <li className="spacing-xs"> <a href="tel: +2347018031835">+2347018031835</a> </li>
              <li> <a href="tel: +2349025568197">+2349025568197</a> </li>
            </ul>
          </div>
          <div className={`flex ${styles.connect_icons}`}>
            <Link className={`spacing-sm flex flex__center ${styles.icon_link} ${styles.facebook}`} to={facebookLink}><GrFacebookOption /></Link>
            <Link className={`spacing-sm flex flex__center ${styles.icon_link} ${styles.twitter}`}  to={twitterLink}><BsTwitter /></Link>
          </div>
        </div>

      </div>      
      
      </div>
  )
}

export default Footer