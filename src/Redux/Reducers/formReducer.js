import { FORM_OPEN } from "../types";
const initialState = {
  open: false,
};


export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_OPEN:
      return {
        ...state,
        open: action.payload
      }
    default:
      return state
  }
};

