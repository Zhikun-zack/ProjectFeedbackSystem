import axios from "axios";
import { FETCH_USER } from "./types";

//Send request to server side, To find whether the user has been authorized 
//An action creater
export const fetchUser = () => 
    //ReduxThunk will check automatically when return is a function, and automatically execute the dispatch function in the argument without need store.dispatch
    async dispatch => {
        //If user has logged in, will return a json contains the googleID and some other user information
        const res = await axios.get('./api/current_user');
        //Dispatch sends the action to all the different  reducers in the store causing them to instantly recalculate the app state
        //res.data is the only thing that we care
        dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => 
    async dispatch => {
        const res = await axios.post("/api/stripe", token);

        dispatch({ type: FETCH_USER, payload: res.data});
    }

export const submitSurvey = (values, history) => 
    async dispatch => {
        const res = await axios.post('/api/surveys',values);
        history.push("/surveys");
        dispatch( { type:FETCH_USER, payload: res.data } );
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({type: FETCH_SURVEYS, payload: res.data});
}   