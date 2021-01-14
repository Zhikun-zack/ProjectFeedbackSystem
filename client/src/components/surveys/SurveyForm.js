import _ from "lodash";
//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
//Field is used to render all the HTML form type e.g. checkbox radiobox
import { reduxForm, Field } from "redux-form";
import SurveyFeild from "./SurveyField";
import {Link} from "react-router-dom";

//a var which contains all the attributs of Fields
const FIELDS = [
    { label: "Survey Title", name: 'title' },
    { label: "Subject Line", name: 'subject'},
    { label: 'Email Body', name: 'body'},
    { label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component{
    //used to render the fields and use the field defined myself not using Field library directly
    renderFields(){
        return (
            //execute the function on each records in FIELDS
            _.map(FIELDS,({ label, name }) => {
                return <Field key={name} component={SurveyFeild} type= "text" label={label} name={ name }/>
            })
        )
    }
    render( ){
        return (
            <div>
                {/** onSubmit is working when button which type is submit be clicked and the value is the words input in a object type*/}
                <form onSubmit = {this.props.handleSubmit(value => console.log(value))}>
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

function validate(values){
    //errors will contains in input.meta, go to SurveyField.js
    const errors = {};

    _.each(FIELDS, ({ name }) => {
        if(!values[name]){
            errors[name] = "You must provide a value"
        }
    })

    return errors;
}

export default reduxForm({
    validate,
    form: "surveyForm"
})(SurveyForm);