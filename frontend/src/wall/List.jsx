import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WallActions from './actions';
import { FormattedRelative } from 'react-intl';

class WallList extends React.Component {
    componentDidMount() {
        this.props.actions.getPosts();
    }
    
    render() {
        const { wall, actions } = this.props;

        return (
            <div>
                <h3>Wall messages</h3>
                <ul>
                {wall.posts.map(post => {
                    return <li key={post.id}>
                        <div><strong>{post.author.username}</strong> wrote <i><FormattedRelative value={post.created_at} /></i>:</div>
                        <p>{post.body}</p>
                    </li>;
                })}
                </ul>
            </div>
        );
    }
}

function mapState(state) {
    return {
        wall: state.wall
    };
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(WallActions, dispatch)
    };
}

export default connect(mapState, mapDispatch)(WallList);
