//SurveyNew will contain SurveyForm before submit and contain SurveyReview after submit
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component{
    //define state to decide whether shows the form or review form
    state = { showFormReview: false };
    renderContent(){
        if (this.state.showFormReview){

            return <SurveyFormReview onCancel = {() => this.setState({ showFormReview: false })}/>
        }
        //onSurveySubmit callback function, execute when changed the page 
        return <SurveyForm onSurveySubmit = {() => this.setState({ showFormReview: true })}></SurveyForm>
    }
    render( ){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
};

export default SurveyNew;