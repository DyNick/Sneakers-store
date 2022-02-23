import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navigation.module.scss";
import { useLocation } from "react-router-dom";
import ProfilePopup from "../ProfilePopup/ProfilePopup";
import SignUp from "../Sign Up/SignUp";
function Navigation({formOpen}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])


  const handleResize = () => {
    if (window.innerWidth > 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
  <Fragment>
    <nav className={styles.navbar}>
      <div className="container">
        {isMobile && (
          <img src="img/icon-menu.png" onClick={() => toggleOpen()} />
        )}
        <ul className={isOpen ? styles.navbarNav : styles.navbarNavClose}>
          <li className={styles.navbarClose} onClick={() => toggleOpen()}>
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
          <Link
            to="/favorites"
            className={
              splitLocation[1] === "favorites"
                ? styles.activeProfile
                : styles.navbarProfileItem
            }
          >
            <img src="img/heart.svg" alt="favorite" />
          </Link>
          <Link
            to="/basket"
            className={
              splitLocation[1] === "basket"
                ? styles.activeProfile
                : styles.navbarProfileItem
            }
          >
            <img src="img/cart.svg" alt="basket" />
          </Link>
          <div className={
              isMenuOpen
                ? styles.activeProfile
                : styles.navbarProfileItem
            } ref={ref}>
            <img
              src="img/user.svg"
              alt="user"
              onClick={() => setIsMenuOpen((oldState) => !oldState)}
            ></img>
            {isMenuOpen ? <ProfilePopup isShow={isMenuOpen} /> : <ProfilePopup isShow={isMenuOpen}/>}
          </div>
        </div>
      </div>
    </nav>
    {formOpen ? <SignUp />: null}
    </Fragment>
    
  );
}
const mapStateToProps = (state) => {
  return {
      formOpen: state.formReducer.open
  };
};

export default connect(mapStateToProps, null)(Navigation);
