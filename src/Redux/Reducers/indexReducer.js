import {combineReducers} from 'redux';

import cardReducer from '../Reducers/cardReducer';
import inputFilterReducer from './filterReducer';
import favoriteReducer from './favoriteReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers ({cardReducer,inputFilterReducer,favoriteReducer,formReducer});

export default rootReducer; 