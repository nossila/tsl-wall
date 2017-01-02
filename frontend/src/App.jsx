import React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';

import WelcomeView from './accounts/Welcome.view';

addLocaleData([...en]);

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.shape().isRequired,
    };

    render() {
        return (
            <IntlProvider locale="en-US">
                <div className="app">
                    <h1>TSL's Wall</h1>
                    <WelcomeView />
                    {this.props.children}
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

export default connect(mapStateToProps)(App);
