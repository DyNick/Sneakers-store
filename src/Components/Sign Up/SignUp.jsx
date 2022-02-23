import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import style from "./SignUp.module.scss";
import { setFormOpenValue } from "../../Redux/Actions/formAction";
import axios from "axios";
import { useNavigate } from "react-router";
import { passCheck, checkEmail, passCheckConfirm } from "./SignUpValidation";

function SignUp({ onSetFormOpenValue }) {
  const [value, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState("signUp");
  const navigate = useNavigate();

  function handleChange(e) {
    value[e.target.id] = e.target.value;
    setValue(value);
  }
  function submitForm(e, formType) {
    e.preventDefault();
    let errors = {};
    let validFlag = true;

    if (!value.name && formType === "signUp") {
      errors.name = "Enter a valid name";
      validFlag = false;
    }
    if (!checkEmail(value.email)) {
      errors.email = "Enter a valid email";
      validFlag = false;
    }

    if (!passCheck(value.pass)) {
      errors.pass = "Enter a valid password";
      validFlag = false;
    }
    
    if (passCheckConfirm(value.passConfirm)  && formType === "signUp") {
      
      if (value.pass !== value.passConfirm) {
        errors.passConfirm = "Please repeat password";
        validFlag = false;
      }
    }

    setErrors(errors);

    if (validFlag && formType === "signUp") {
      alert("You successfully registered.Please Login");
      axios
        .post("https://61769eed03178d00173dada0.mockapi.io/users", value)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
  
      onSetFormOpenValue(false);
    }
    if (validFlag && formType === "signIn") {
      axios
        .get("https://61769eed03178d00173dada0.mockapi.io/users", value)
        .then((res) => {
          res.data.map((user) => {
            console.log(user);
            if (
              user.email == value.email &&
              user.pass == value.pass
            ) {
              localStorage.setItem("login_id", JSON.stringify(user.name));
              alert (`${user.name} you loged!`)
              onSetFormOpenValue(false);
            }

            else if(
              user.pass !== value.pass
            ){
              console.log('Please enter valid password');
              errors.signup = "Please enter valid password";
        
            }
            else if(
              user.email !== value.email
            ){
              console.log('Please enter valid email');
              errors.signup = "Please enter valid email";
          
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }

  function onChangeValue(e) {
    setFormValue(e.target.value);
  }

  return (
    <Fragment>
      <div className={style.formOverlay}>
        <div className={style.formsWrapper}>
          {formValue === "signUp" ? (
            <form className={style.form}>
              <div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                  <p style={{ color: "red" }}>{errors.name}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={(e) => handleChange(e)}
                  />
                  <p style={{ color: "red" }}>{errors.email}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="pass"
                    onChange={(e) => handleChange(e)}
                  />
                  <p style={{ color: "red" }}>{errors.pass}</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="passConfirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="passConfirm"
                    onChange={(e) => handleChange(e)}
                  />
                  <p style={{ color: "red" }}>{errors.passConfirm}</p>
                </div>

                <button
                  id="signUp"
                  type="submit"
                  onClick={(e) => submitForm(e, "signUp")}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <form className={style.form}>
              <p style={{ color: "red" }}>{errors.signup}</p>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={(e) => handleChange(e)}
                />
                <p style={{ color: "red" }}>{errors.email}</p>
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  onChange={(e) => handleChange(e)}
                />
                <p style={{ color: "red" }}>{errors.pass}</p>
              </div>

              <button
                id="signIn"
                type="submit"
                onClick={(e) => submitForm(e, "signIn")}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          )}

          <button
            onClick={() => onSetFormOpenValue(false)}
            className={style.close}
          >
            &#9587;
          </button>
          <div>
            <input
              type="radio"
              value="signUp"
              name="formType"
              onChange={(e) => onChangeValue(e)}
              defaultChecked={formValue === "signUp" && "checked"}
            />{" "}
            SignUp
            <input
              type="radio"
              value="signIn"
              name="formType"
              onChange={(e) => onChangeValue(e)}
              checked={formValue === "signIn" && "checked"}
            />{" "}
            SignIn
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetFormOpenValue: (value) => {
      dispatch(setFormOpenValue(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
