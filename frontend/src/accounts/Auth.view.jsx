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
        }).isRequired
    }

    onFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    login = (e) => {
        e.preventDefault();
        this.props.actions.authLoginUser(this.state.username, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.login}>
                <fieldset>
                    <legend>Login</legend>

                    <input name="username" type="text" value={this.state.username} onChange={this.onFormChange} placeholder="username" required="required" />
                    <input name="password" type="password" value={this.state.password} onChange={this.onFormChange} placeholder="*****" required="required" />
                                
                    <button type="submit">Go</button>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
