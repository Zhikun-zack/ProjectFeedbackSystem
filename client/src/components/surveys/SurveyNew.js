//SurveyNew will contain SurveyForm before submit and contain SurveyReview after submit
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";

class SurveyNew extends Component{
    render( ){
        return (
            <div>
                <SurveyForm></SurveyForm>
            </div>
        )
    }
}

export default SurveyNew;