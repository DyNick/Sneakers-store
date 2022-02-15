import { IMPORT_CARDS } from "../types"

export function getCards(cards) {
  //console.log(cards);
    return {
        type: IMPORT_CARDS,
        payload: cards
    }
}
