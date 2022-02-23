import { FORM_OPEN } from "../types";


export function setFormOpenValue(value) {
    //console.log(value);
      return {
          type: FORM_OPEN,
          payload: value
      }
}
