import {combineReducers} from 'redux';

import cardReducer from '../Reducers/cardReducer';
import inputFilterReducer from './filterReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers ({cardReducer,inputFilterReducer,favoriteReducer});

export default rootReducer; 