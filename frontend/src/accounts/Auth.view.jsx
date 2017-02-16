import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actionCreators from './auth.actions';

class AuthView extends React.Component {
    state = {username: '', password: ''};

    static propTypes = {
        actions: React.PropTypes.shape({
            authLoginUser: React.PropTypes.func.isRequired
        }).isRequired,
        className: React.PropTypes.string,
        loginStatus: React.PropTypes.string,
        loginError: React.PropTypes.string
    }

    onFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    login = (e) => {
        e.preventDefault();
        this.props.actions.authLoginUser(this.state.username, this.state.password);
    }

    render() {
        var loginStatus;
        if (this.props.loginStatus) {
            loginStatus = (<div className="alert alert-info" role="alert">{this.props.loginStatus}</div>);
        }

        var loginError;
        if (this.props.loginError) {
            loginError = (<div className="alert alert-danger" role="alert">{this.props.loginError}</div>);
        }

        var className = this.props.className || 'col-md-6';

        return (
            <form onSubmit={this.login} className={className}>
                <fieldset className="well">
                    <legend>Login</legend>

                    {loginStatus}
                    {loginError}

                    <div className="form-group">
                        <label className="sr-only" htmlFor="auth_username">username</label>
                        <input name="username" id="auth_username" className="form-control" type="text" value={this.state.username} onChange={this.onFormChange} placeholder="username" required="required" />
                    </div>

                    <div className="row"><div className="col-xs-9 col-md-10 form-group">
                        <label className="sr-only" htmlFor="auth_password">password</label>
                        <input name="password" id="auth_password" className="form-control" type="password"  value={this.state.password} onChange={this.onFormChange} placeholder="*****" required="required" />
                    </div> <div className="col-xs-3 col-md-2">
                        <button type="submit" className="btn btn-primary btn-block">Go</button>
                    </div></div>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.auth.loginStatus,
        loginError: state.auth.loginError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
