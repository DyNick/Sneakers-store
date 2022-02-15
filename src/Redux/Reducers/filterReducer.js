import { FILTER_INPUT_VALUE, FILTER_SELECT_VALUE } from "../types";
const initialState = {
  inputVal: '',
};


export default function inputFilterReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_INPUT_VALUE:
      return {
        ...state,
        inputVal: action.payload
      }
    case FILTER_SELECT_VALUE:
      return {
        ...state,
        selectVal: action.payload
      }
    default:
      return state
  }
};

