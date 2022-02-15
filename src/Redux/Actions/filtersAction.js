import { FILTER_INPUT_VALUE,FILTER_SELECT_VALUE } from "../types";


export function getInputFilters(value) {
      return {
          type: FILTER_INPUT_VALUE,
          payload: value
      }
}

export function getSelectFilters(value) {
    return {
        type: FILTER_SELECT_VALUE,
        payload: value
    }
}