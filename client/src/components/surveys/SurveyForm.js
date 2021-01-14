import _ from "lodash";
//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
//Field is used to render all the HTML form type e.g. checkbox radiobox
import { reduxForm, Field } from "redux-form";
import SurveyFeild from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFeild";



class SurveyForm extends Component{
    //used to render the fields and use the field defined myself not using Field library directly
    renderFields(){
        return (
            //execute the function on each records in FIELDS
            _.map(formFields,({ label, name }) => {
                return <Field key={name} component={SurveyFeild} type= "text" label={label} name={ name }/>
            })
        )
    }
    render( ){
        return (
            <div>
                {/** onSubmit is working when button which type is submit be clicked*/}
                <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {/**Form contains all the Fields */}
                    {this.renderFields()}
                    <Link to="/surveys" className = "red btn-flat white-text">Cancel</Link>
                    <button type = "submit" className = "teal btn-flat right white-text">
                        Next
                        <i className = "material-icons right">done</i>
                    </button>
                   
                </form>
                
            </div>
        )
    }
}

//a function takes the values input in each form and return the error information if the input is not followed your requirement
//And also shows the error information below each field
function validate(values){
    //errors will contains in input.meta, go to SurveyField.js
    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]){
            errors[name] = "You must provide a value"
        }
    })

    errors.emails = validateEmails(values.emails||"");

    return errors;
}

export default reduxForm({
    
    validate,
    form: "surveyForm",
    destroyOnUnmount: false 
})(SurveyForm);