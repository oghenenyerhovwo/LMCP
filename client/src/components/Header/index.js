import { useState } from "react"
import { useSelector } from 'react-redux'

// importing components
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';
import Avatar from "../Avatar"

// importing css
import styles from "./style.module.css"

// assets
import { logo } from "../../assets"


const Header = () => {

  // global state
  const { currentUser } =  useSelector(state => state.userStore)
  const [toggleMenu, setToggleMenu] = useState(false)
 

  const handleToggleMenu = e => {
    const navItemElement = document.querySelector(`.${styles.nav_items}`)
    if(toggleMenu){
      navItemElement.style.width = "0"
    } else {
      navItemElement.style.width = "100%"
    }
    setToggleMenu(prevToggle => !prevToggle)
  }

  return (
    <header className={`container ${styles.app_header_container}`}>
      <div className={`flex ${styles.navbar}`}>
        <div className={`${styles.nav_brand}`}>
          <h3><img src={logo} alt="logo" /> LMCP</h3>
          {/* <Image src="/logo.png" width="128" height="77" alt="logo" /> */}
        </div>
        <nav className={`flex ${styles.nav_items}`}>
          <ul className="flex">
            <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/about">About</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/story">Blog</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/faq">Faq</Link></li>
          </ul>            
        </nav>
        {
          currentUser.email ? <Link  className="flex flex__center" to={`/profile/${currentUser._id}`}><span className={styles.name}>{currentUser.fullName.split(" ")[0]}</span> {currentUser.profilePic ? <img className={styles.profile_pic} src={currentUser.profilePic} alt="profile_pic" /> : <span className={styles.profile_pic}><Avatar gender={currentUser.gender} /></span>  } </Link>:
          <div className={styles.nav_button_container}><Link className={styles.nav_button}  to="/signin"><span>Join</span> <span className={styles.nav_button_overlay}></span> </Link></div>
        }
        <div onClick={handleToggleMenu} className={`${styles.menu_icon}`}><GiHamburgerMenu /></div>
      </div>
    </header>
  )
}

export default Header