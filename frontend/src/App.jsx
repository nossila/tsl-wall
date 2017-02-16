import React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';

import AuthView from './accounts/Auth.view';
import RegisterView from './accounts/Register.view';
import WelcomeView from './accounts/Welcome.view';

addLocaleData([...en]);

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.shape().isRequired,
        isAuthenticated: React.PropTypes.bool.isRequired,
    };

    render() {
        var user_forms;
        if(!this.props.isAuthenticated){
            user_forms = (<div>
                <h4>Hello, guest. First you need to:</h4>

                <div className="row">
                    <AuthView />
                    <RegisterView />
                </div>
            </div>);
        }

        return (
            <IntlProvider locale="en-US">
                <div className="app">
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">TSL's Wall</a>
                            </div>
                            <WelcomeView />
                        </div>
                    </nav>

                    <div className="container">
                        {user_forms}
                        {this.props.children}
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(App);
