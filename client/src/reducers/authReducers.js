//This file is a reducer for authorizing 
import {FETCH_USER} from "../actions/types";

export default function (state = null, action){
    //console.log(action);
    //Only return three values: null (working on and not get the results) payload(authorized) and false (unauthorized)
    switch (action.type){
        case FETCH_USER:
            return action.payload || false;
        default: 
            return state;
    }
}