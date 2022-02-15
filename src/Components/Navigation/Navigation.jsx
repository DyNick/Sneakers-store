import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useLocation } from "react-router-dom";
function Navigation() {
  
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleResize = () => {
    if (window.innerWidth > 600) {
        setIsMobile(false)
    } else {
        setIsMobile(true)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
 const toggleOpen = ()=>{
   setIsOpen(!isOpen);
 }
  
  return (
    <nav className={styles.navbar}>
      <div className="container">
      {isMobile&&<img src="img/icon-menu.png" onClick={()=>toggleOpen()}/>}
        <ul className={isOpen ? styles.navbarNav:  styles.navbarNavClose}>
        <li className={styles.navbarClose} onClick={()=>toggleOpen()}>
          <span>&#10006;</span>
        </li>
          <li className={styles.navbarNavItem}>
            <Link
              to="/"
              className={
                splitLocation[1] === "" ? styles.active : styles.navbarNavLink
              }
            >
              Home
            </Link>
          </li>
          <li className={styles.navbarNavItem}>
            <Link
              to="/about"
              className={
                splitLocation[1] === "about"
                  ? styles.active
                  : styles.navbarNavLink
              }
            >
              About
            </Link>
          </li>
          <li className={styles.navbarNavItem}>
            <a className={styles.navbarNavLink}>Disabled</a>
          </li>
        </ul>
        <div className={styles.navbarProfile}>
          <Link to="/favorites"
            className={
              splitLocation[1] === "favorites" ? styles.activeProfile : styles.navbarProfileItem
            }
           >
            <img src="img/heart.svg" alt="favorite" />
          </Link>
          <Link to="/basket" 
           className={
            splitLocation[1] === "basket" ? styles.activeProfile : styles.navbarProfileItem
          }
          >
            <img src="img/cart.svg" alt="basket" />
          </Link>
          <div className={styles.navbarProfileItem}>
            <img src="img/user.svg" alt="user" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
