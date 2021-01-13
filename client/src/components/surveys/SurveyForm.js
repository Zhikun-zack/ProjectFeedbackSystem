//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
//Field is used to render all the HTML form type e.g. checkbox radiobox
import { reduxForm, Field } from "redux-form";
import SurveyFeild from "./SurveyField";

class SurveyForm extends Component{
    //render the fields using the field defined myself not using Field library directly
    renderFields(){
        return (
            <div>
                <Field type = "text" name = "title" component = {SurveyFeild}></Field>
            </div>
        )
    }
    render( ){
        return (
            <div>
                {/** onSubmit is working when button which type is submit be clicked and the value is the words input*/}
                <form onSubmit = {this.props.handleSubmit(value => console.log(value))}>
                    {this.renderFields()}
                    <button type = "submit" >Submit</button>
                </form>
                
            </div>
        )
    }
}

export default reduxForm({
    form: "surveyForm"
})(SurveyForm);