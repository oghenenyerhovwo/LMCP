import { useState, useRef, useEffect } from "react"
import { useSelector } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
import Avatar from "../Avatar"
import CustomLink from "../CustomLink"

// importing css
import styles from "./style.module.css"

// assets
import { logo } from "../../assets"


const Header = () => {
  
  const menuRef = useRef(null)

  // global state
  const { currentUser } =  useSelector(state => state.userStore)
  const [toggleMenu, setToggleMenu] = useState(false)

  const closeMenu = e => {
    const navItemElement = document.querySelector(`.${styles.nav_items}`)
    if(menuRef.current && toggleMenu && !menuRef.current.contains(e.target)){
      navItemElement.style.top = "-1000%"
      setToggleMenu(false)
    } 
  }


  useEffect(() => {
    document.addEventListener('mousedown', closeMenu)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
    };
  })
 
  const closeMenuLinks = e => {
    const navItemElement = document.querySelector(`.${styles.nav_items}`)
    navItemElement.style.top = "-1000%"
    setToggleMenu(false)
  }

  const handleToggleMenu = e => {
    const navItemElement = document.querySelector(`.${styles.nav_items}`)
    if(toggleMenu){
      navItemElement.style.top = "-1000%"
    } else {
      navItemElement.style.top = "100%"
    }
    setToggleMenu(prevToggle => !prevToggle)
  }

  return (
    <header className={`container ${styles.app_header_container}`}>
      <div className={`flex ${styles.navbar}`}>
        <div className={`${styles.nav_brand}`}>
          <h3><img src={logo} alt="logo" /> <CustomLink href="/">LMCP</CustomLink> </h3>
          {/* <Image src="/logo.png" width="128" height="77" alt="logo" /> */}
        </div>
        <nav ref={menuRef} className={`flex ${styles.nav_items}`}>
          <ul className="flex">
            <li><CustomLink onClick={closeMenuLinks} className={`${styles.nav_links}`} href="/">Home</CustomLink></li>
            <li><CustomLink onClick={closeMenuLinks} className={`${styles.nav_links}`} href="/about">About</CustomLink></li>
            <li><CustomLink onClick={closeMenuLinks} className={`${styles.nav_links}`} href="/story">Blog</CustomLink></li>
            <li><CustomLink onClick={closeMenuLinks} className={`${styles.nav_links}`} href="/event">Event</CustomLink></li>
            <li><CustomLink onClick={closeMenuLinks} className={`${styles.nav_links}`} href="/faq">Faq</CustomLink></li>
          </ul>            
        </nav>
        {
          currentUser._id ? <CustomLink  className="flex flex__center" href={`/profile/${currentUser._id}`}><span className={styles.name}>{currentUser.fullName.split(" ")[0]}</span> {currentUser.profilePic ? <img className={styles.profile_pic} src={currentUser.profilePic} alt="profile_pic" /> : <span className={styles.profile_pic}><Avatar gender={currentUser.gender} /></span>  } </CustomLink>:
          <div className={styles.nav_button_container}><CustomLink className={styles.nav_button}  href="/signin"><span>Join</span> <span className={styles.nav_button_overlay}></span> </CustomLink></div>
        }
        <div onClick={handleToggleMenu} className={`${styles.menu_icon}`}><GiHamburgerMenu /></div>
      </div>
    </header>
  )
}

export default Header