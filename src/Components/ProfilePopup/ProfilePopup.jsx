import style from "./ProfilePopup.module.scss";
import { connect } from "react-redux";
import { setFormOpenValue } from "../../Redux/Actions/formAction";
import { useEffect, useState } from "react";

function ProfilePopup({ isShow, onSetFormOpenValue }) {
  const logedUser = JSON.parse(localStorage.getItem("login_id"));
  const [userName, setUserName] = useState(logedUser);
  useEffect(() => {
    if (logedUser == null) {
      setUserName(false);
    }
  }, [logedUser]);

  return (
    <div
      className={
        !isShow
          ? style.PopupWrapper
          : [style.PopupWrapper, style.open].join(" ")
      }
    >
      <p className={style.username}>
        {userName ? `Hi ${userName}` : "Hi User"}
      </p>
      <ul className={style.PopupList}>
        <li
          className={style.PopupItem}
          onClick={() => onSetFormOpenValue(true)}
        >
          Sign Up/Sign In
        </li>
        <li className={style.PopupItem}>Settings</li>
        {userName ? <li className={style.PopupItem}>Log out</li> : null}
      </ul>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetFormOpenValue: (value) => {
      dispatch(setFormOpenValue(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProfilePopup);
