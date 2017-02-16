import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import WallList from './wall/List';
import WallNewPost from './wall/NewPost';

class Home extends React.Component {
    render() {
        var new_post;
        if(this.props.isAuthenticated) {
            new_post = <WallNewPost />;
        }
        return (
            <div>
                {new_post}
                <WallList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Home);
