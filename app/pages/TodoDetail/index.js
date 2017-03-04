

import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TodoView from 'components/TodoView';

import styles from './styles.scss';

export default class TodoDetail extends Component {

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
  }

  static defaultProps = {
    children: null,
    params: {},
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    todo: null,
  }

  componentWillMount() {
    //this._reset(this.props);
  }

  componentWillReceiveProps(props) {
    // if (props.params.todoID !== this.props.params.todoID) {
    //   this._reset(props);
    // }
  }

  render() {
    const {
      loading,
      todo,
    } = this.state;

    return (
      <div className={styles.container}>
        <FlatButton
          onTouchTap={this.goBack}
        >
            Go back
        </FlatButton>
        <TodoView />
      </div>
    );
  }

  goBack = () => {
    this.context.router.push('/');
  }
}
