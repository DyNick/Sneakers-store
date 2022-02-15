import React, { useState, Fragment } from "react";
import styles from "./CardsFilters.module.scss";
import { connect } from "react-redux";
import { getInputFilters } from "../../Redux/Actions/filtersAction";
import { getSelectFilters } from "../../Redux/Actions/filtersAction";

function CardsFilters({ takeInputValue, takeSelectValue }) {
  const options = ["Highest", "Lowest"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    takeSelectValue(value);
  };
  const onChangeInput = (e) => {
    takeInputValue(e.target.value);
    setInputVal(e.target.value);
  };
  const clearInput = () => {
    takeInputValue("");
    setInputVal("");
  };
  return (
    <Fragment>
      <div className={styles.cardsFilter}>
        <div className={styles.cardsSelect}>
          <div className={styles.cardSelectResult} onClick={toggling}>
            <p>
              {selectedOption ? `${selectedOption} price` : "Choose option"}
            </p>
            <img
              src="img/down-arrow.svg"
              alt="search"
              className={isOpen ? styles.cardArrow : styles.cardArrowRotate}
            />
          </div>

          {isOpen && (
            <ul className={styles.cardSelectOptions}>
              {options.map((option) => (
                <li
                  className={styles.cardSelectOption}
                  onClick={onOptionClicked(option)}
                  key={Math.random()}
                >
                  <p>{`${option} price`}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.cardsInput}>
          <input
            type="text"
            value={inputVal}
            className={styles.cardsInputField}
            onChange={(e) => onChangeInput(e)}
            placeholder=" Search..."
          />
          <img
            src="img/search.svg"
            alt="search"
            className={styles.cardSearch}
          />
          <img
            src="img/btn-remove.svg"
            alt="search"
            className={styles.cardRemove}
            onClick={() => clearInput()}
          />
        </div>
      </div>
    </Fragment>
  );
}
// const mapStateToProps = (state) => {
//   console.log(state);
//     return {
//         inputSelectVal: state.inputSelectReducer
//     }
//  }

const mapDispatchToProps = (dispatch) => {
  return {
    takeInputValue: (value) => {
      dispatch(getInputFilters(value));
    },
    takeSelectValue: (value) => {
      dispatch(getSelectFilters(value));
    },
  };
};
export default connect(null, mapDispatchToProps)(CardsFilters);
