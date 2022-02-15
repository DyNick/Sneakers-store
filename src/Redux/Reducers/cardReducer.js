import {IMPORT_CARDS} from "../types";
const initialState = {
  cards: [],
};


export default function cardReducer(state = initialState, action) {
  //console.log(action.payload)
  switch (action.type) {
    case IMPORT_CARDS:
      return {
        ...state, 
        cards: action.payload
      }
    default:
      return state
  }
}
