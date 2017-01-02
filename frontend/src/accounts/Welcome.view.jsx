import React from 'react';
import { connect } from 'react-redux';

import AuthView from './Auth.view';
import RegisterView from './Register.view';

import { authLogout } from './auth.actions';

class Welcome extends React.Component {
    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        userName: React.PropTypes.string,
        statusText: React.PropTypes.string
    }

    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(authLogout());
    }

    render() {
        var statusText;
        if (this.props.statusText) {
            statusText = (<div>{this.props.statusText}</div>);
        }

        if(this.props.isAuthenticated) {
            return (<div>
                <h4>Hello, {this.props.userName}. <a href="#" onClick={this.logout}>sign out</a></h4>
            </div>);
        } else {
            return (<div>
                <h4>Hello, guest.</h4>

                {statusText}

                <AuthView />
                <RegisterView />
            </div>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(Welcome);
