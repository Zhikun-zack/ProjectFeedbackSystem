import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as action from "../actions";

class Payments extends Component {
    render (){

        return (
            <StripeCheckout
                name = "Emaily"
                description = "$5 for 5 email credits"
                //charge 5 dollars 
                amount = {500}
                //callback function input token is the token get from stripe
                token = {token => this.props.handleToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className = "btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, action)(Payments);