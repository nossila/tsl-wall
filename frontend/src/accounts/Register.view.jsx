import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actionCreators from './auth.actions';

class RegisterView extends React.Component {
    state = {email: '', username: '', password: ''};

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        isAuthenticating: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.shape({
            authLoginUser: React.PropTypes.func.isRequired
        }).isRequired,
    }

    onFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    signup = (e) => {
        e.preventDefault();
        this.props.actions.authRegisterUser(
            this.state.username,
            this.state.email,
            this.state.password
        );
    }

    render() {
        var errors;
        if(this.props.registerFormErrors) {
            var errorsLi = [];

            for(var key in this.props.registerFormErrors){
                this.props.registerFormErrors[key].map(function(error) {
                    errorsLi.push(
                        <li><strong>{key}</strong>: {error}</li>
                    );
                });

            }

            errors = (<ul>{errorsLi}</ul>);
        }

        return (
            <form onSubmit={this.signup}>
                <fieldset>
                    <legend>Sign Up</legend>

                    {errors}

                    <input name="username" type="text" value={this.state.username} onChange={this.onFormChange} placeholder="username" required="required" />
                    <input name="email" type="text" value={this.state.email} onChange={this.onFormChange} placeholder="a@b.com" required="required" />
                    <input name="password" type="password" value={this.state.password} onChange={this.onFormChange} placeholder="*****" required="required" />
                                
                    <button type="submit">Sign up</button>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        registerFormErrors: state.auth.registerFormErrors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
