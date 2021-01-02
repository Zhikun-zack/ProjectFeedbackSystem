//This fill will use combineReducer to combine all the reducers together 
import { combineReducers } from 'redux';
import authReducer from "./authReducers";

export default combineReducers({
    //The return state will have these properties
    auth: authReducer,
});