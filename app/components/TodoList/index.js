

import React, { Component, PropTypes } from 'react';

import styles from './styles.scss';

export default class TodoList extends Component {

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
  }

  static defaultProps = {
    children: null,
    params: {},
  }

//   static contextTypes = {
//     NotificationManager: PropTypes.object.isRequired,
//     router: PropTypes.object.isRequired,
//     store: PropTypes.object.isRequired,
//     debug: PropTypes.func.isRequired,
//   }

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
        TODO
      </div>
    );
  }
}
