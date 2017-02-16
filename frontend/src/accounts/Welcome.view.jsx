import React from 'react';
import { connect } from 'react-redux';

import { authLogout } from './auth.actions';

class Welcome extends React.Component {
    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        userName: React.PropTypes.string
    }

    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(authLogout());
    }

    render() {
        var text = null;
        if(this.props.isAuthenticated) {
            text = (<p className="navbar-text navbar-right">
                Hello, {this.props.userName}. <a href="#" onClick={this.logout}>sign out</a>
            </p>);
        }

        return text;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.auth.userName,
    };
};

export default connect(mapStateToProps)(Welcome);
