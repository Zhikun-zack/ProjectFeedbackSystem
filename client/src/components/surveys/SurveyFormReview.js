//SurveyFormReview shows users their form input for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFeild";
import { withRouter } from "react-router";
import * as actions from "../../actions";

function mapStateToProps(state){
    //console.log(state)
    return { formValues: state.form.surveyForm.values }
}

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields,field => {
        return (
            <div key = {field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });
    return(
        <div>
            <h5>Please confirm you entries</h5>
            {reviewFields}
            <button
                className = "yellow darken-3 white-text btn-flat"
                onClick={ onCancel }
            >Back</button>
            <button 
                onClick = { () => submitSurvey(formValues, history) }
                className = "green white-text btn-flat right"
            >
                Send Survey
                <i className = "material-icons right">email</i>
            </button>
        </div>
    );
};



export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));