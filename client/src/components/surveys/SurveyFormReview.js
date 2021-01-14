//SurveyFormReview shows users their form input for review
import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state){
    //console.log(state)
    return { formValues: state.form.surveyForm.values }
}

const SurveyFormReview = ({ onCancel, formValues }) => {
    return(
        <div>
            <h5>Please confirm you entries</h5>
            <div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
                <div>
                    <label>Subject Line</label>
                    <div>{formValues.title}</div>
                </div>
                <div>
                    <label>Email Body</label>
                    <div>{formValues.title}</div>
                </div>
                <div>
                    <label>R</label>
                    <div>{formValues.title}</div>
                </div>
            </div>
            <button
                className = "yellow darken-3 btn-flat"
                onClick={ onCancel }
            >Back</button>
        </div>
    );
};



export default connect(mapStateToProps)(SurveyFormReview);