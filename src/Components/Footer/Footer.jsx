import React from "react";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerInner}>
          <span className={style.text}>Sneakers store</span>
          <span className={style.copyright}>© 2022 Company, Inc</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
