//SurveyFeild contains logic to render each label and input
import React from "react";

//the input param is the props.input which contains the input values and some event handlers
//label is the attribute in <form> in SurveyForm.js
export default ({input,label,meta:{error, touched}}) => {
    //console.log(meta);
    return(
        <div>
            <label>
                {label}
            </label>
            {/** {...input} means given the input value to correspondingly event handler */}
            <input {...input} style = {{ marginBottom: "2px"}}></input>
            {/**If the user clicked the input and not input any value show the error information  */}
            <div className = "red-text" style = { {marginBottom: "20px"}}>
                {touched && error}
            </div>
            
        </div>
    )
}