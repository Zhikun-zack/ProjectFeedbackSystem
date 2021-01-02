import React, { Component } from "react";
import {connect} from "react-redux";

class Header extends Component {
    //Used to change the page based on the auth value
    renderContent(){
        switch (this.props.auth){
            case null :
                return;
            case false:
                return (
                    <li><a href = "/auth/google">Login With Google</a></li>
                );
            default: 
                return <li><a>Logout</a></li>
        }
    }

    render () {
        return (
            <nav>
                <div className = "nav-wrapper">
                    <a className = 'left brand-logo'>Emaily</a>
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