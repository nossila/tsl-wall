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
        className: React.PropTypes.string,
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

            errors = (<div className="alert alert-danger">
                <ul role="alert">{errorsLi}</ul>
            </div>);
        }

        var className = this.props.className || 'col-md-6';

        return (
            <form onSubmit={this.signup} className={className}>
                <fieldset className="well">
                    <legend>Sign Up</legend>

                    {errors}

                    <div className="row">
                        <div className="col-xs-6 form-group">
                            <label className="sr-only" htmlFor="register_username">username</label>
                            <input name="username" id="register_username" className="form-control" type="text" value={this.state.username} onChange={this.onFormChange} placeholder="username" required="required" />
                        </div> <div className="col-xs-6 form-group">
                            <label className="sr-only" htmlFor="register_email">email</label>
                            <input name="email" id="register_email" className="form-control" type="text" value={this.state.email} onChange={this.onFormChange} placeholder="a@b.com" required="required" />
                        </div> <div className="col-xs-8  col-md-9 form-group">
                            <label className="sr-only" htmlFor="register_password">password</label>
                            <input name="password" id="register_password" className="form-control" type="password" value={this.state.password} onChange={this.onFormChange} placeholder="*****" required="required" />
                        </div> <div className="col-xs-4 col-md-3">
                            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                        </div>
                    </div>
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
