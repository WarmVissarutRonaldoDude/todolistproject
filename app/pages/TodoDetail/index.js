

import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { fullWhite } from 'material-ui/styles/colors';
import TodoView from 'components/TodoView';

import styles from './styles.scss';

export default class TodoDetail extends Component {

  static propTypes = {
    params: PropTypes.object,
  }

  static defaultProps = {
    params: {},
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  goBack = () => {
    this.context.router.push('/');
  }

  render() {
    const noteId = this.props.params.todoID;
    const noteModel = this.context.store.getNoteById(noteId);

    return (
      <div className={styles.container}>
        <RaisedButton
          backgroundColor={'#a4c639'}
          style={{
            margin: 12,
          }}
          icon={<NavigationArrowBack color={fullWhite} />}
          onTouchTap={this.goBack}
        />
        { noteModel &&
          <TodoView
            note={noteModel}
          />
        }
      </div>
    );
  }
}
