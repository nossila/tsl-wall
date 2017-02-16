import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WallActions from './actions';

class WallNewPost extends React.Component {
    state = {body: ''}

    onFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createPost = (e) => {
        e.preventDefault();
        this.props.actions.createPost(this.state.body);
        this.setState({body: ''});
    }
    
    render() {
        const { actions } = this.props;

        var className = this.props.className || '';

        return (
            <form onSubmit={this.createPost} className={className}>
                <fieldset>
                    <legend>Add message to wall</legend>

                    <div className="form-group">
                        <textarea name="body" value={this.state.body}
                                   onChange={this.onFormChange} required="required"
                                   placeholder="what's on your mind?" className="form-control"  />
                    </div>
                    <button type="submit" className="btn btn-primary">send</button>
                </fieldset>
            </form>
        );
    }
}

function mapState(state) {
    return {};
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(WallActions, dispatch)
    };
}

export default connect(mapState, mapDispatch)(WallNewPost);
