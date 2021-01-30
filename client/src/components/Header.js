import React, { Component } from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payment";

class Header extends Component {
    //Used to change the page based on the auth value
    renderContent(){
        //auth is the key of authreducer in combineReducer and use to tell whether the user has logged in
        switch (this.props.auth){
            case null :
                //still holding on
                return;
            case false:
                //the user didn't log in
                return (
                    <li><a href = "/auth/google">Login With Google</a></li>
                );
            default: 
            ///api/logout is related to server/reducers/authReducers  not the client side
                return [
                    <li key = "1"><Payments></Payments></li>,
                    <li key = "3" style = {{margin:"0 10px"}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key = "2"><a href = "/api/logout">Logout</a></li>
            ];
        }
    }

    render () {
        return (
            <nav>
                <div className = "nav-wrapper">
                    <Link to = {this.props.auth ? '/surveys' : '/' } className = 'left brand-logo'>Emaily</Link>
                    <ul className = "right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    //state.auth is declared in reducers/index.js
    return {auth: state.auth};
}

export default connect(mapStateToProps)(Header);