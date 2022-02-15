import { FAVORITES_GET_ITEM } from "../types";

const initialState = {
    cards: []
  };
  
  
  export default function favoriteReducer(state = initialState, action) {
    switch (action.type) {
      case FAVORITES_GET_ITEM:
        return {
          ...state,
          cards: [...state.cards,  action.payload]
         
        }
      default:
        return state
    }
  };