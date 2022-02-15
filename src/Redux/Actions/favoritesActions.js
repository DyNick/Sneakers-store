import { FAVORITES_GET_ITEM } from "../types";



export function favoritesGetCard (item) {
    return {
        type: FAVORITES_GET_ITEM,
        payload: item
    }
}