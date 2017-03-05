
import React, { Component, PropTypes } from 'react';
import TodoList from 'components/TodoList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

import _ from 'lodash';

import styles from './styles.scss';

export default class Home extends Component {

  static defaultProps = {
    children: null,
  }

  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  state = {
    openAddNote: false,
    windowHeight: window.innerHeight,
    descriptionText: '',
    titleText: '',
    disabledSubmitNote: true,
  }

  componentWillMount() {
    window.addEventListener('resize', this.onComponentResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onComponentResize);
  }

  onComponentResize = () => {
    if (window.innerHeight !== this.state.windowHeight) {
      this.setState({
        windowHeight: window.innerHeight,
      });
    }
  }

  onTitleChange = (event) => {
    const text = event.target.value;

    // title is required field for submit new note
    const allowSubmit = text && (_.trim(text)).length;

    this.setState({
      titleText: text,
      disabledSubmitNote: !allowSubmit,
    });
  }

  onDescChange = (event) => {
    const text = event.target.value;
    this.setState({ descriptionText: text });
  }

  onAddNote = (e) => {
    e.preventDefault();
    this.setState({
      openAddNote: true,
      descriptionText: '',
      titleText: '',
      disabledSubmitNote: true,
    });
  }

  onTouchList = (todoID) => {
    const nextRoute = `/TodoDetail/${todoID}`;
    this.context.router.push(nextRoute);
  }

  onSetIsComplete = (todoID, isComplete) => {
    this.context.store.setComplete(todoID, isComplete)
      .then(() => {
        this.forceUpdate();
      })
      .catch((err) => {
        alert(`${err}`);
      });
  }

  getAddNoteButtonActionDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCloseAddNote}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        disabled={this.state.disabledSubmitNote}
        onTouchTap={this.handleSubmitAddNote}
      />,
    ];

    return actions;
  }

  getNotes(options = {}) {
    const notes = this.context.store.getNotes(options);
    return notes;
  }

  handleCloseAddNote = () => {
    this.setState({
      openAddNote: false,
      descriptionText: '',
      titleText: '',
      disabledSubmitNote: true,
    });
  }

  handleSubmitAddNote = (e) => {
    e.preventDefault();

    const Note = {
      title: this.state.titleText,
      description: this.state.descriptionText,
      date: new Date(),
    };

    return this.context.store.addNote(Note)
        .then(() => {
          this.setState({
            openAddNote: false,
            descriptionText: '',
            titleText: '',
            disabledSubmitNote: true,
          });
        })
        .catch((err) => {
          alert(`Add note error : ${err}`);
        });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.addButtonContainer}>
          <FloatingActionButton
            id={'addNoteButton'}
            onTouchTap={this.onAddNote}
            mini
            secondary
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>

        <Tabs>
          <Tab label="All" >
            <TodoList
              listData={this.getNotes()}
              onTouchList={this.onTouchList}
              onSetIsComplete={this.onSetIsComplete}
              height={`${this.state.windowHeight - 60}px`}
            />
          </Tab>
          <Tab label="Completed" >
            <TodoList
              listData={this.getNotes({ filter: 'completed' })}
              onTouchList={this.onTouchList}
              onSetIsComplete={this.onSetIsComplete}
              height={`${this.state.windowHeight - 60}px`}
            />
          </Tab>
          <Tab label="Active">
            <TodoList
              listData={this.getNotes({ filter: 'active' })}
              onTouchList={this.onTouchList}
              onSetIsComplete={this.onSetIsComplete}
              height={`${this.state.windowHeight - 60}px`}
            />
          </Tab>
        </Tabs>

        <Dialog
          title="Add Note"
          actions={this.getAddNoteButtonActionDialog()}
          modal={false}
          open={this.state.openAddNote}
          onRequestClose={this.handleCloseAddNote}
        >
          <TextField
            id={'titleText'}
            value={this.state.titleText}
            placeholder="Title"
            multiLine={false}
            fullWidth
            onChange={this.onTitleChange}
          />
          <TextField
            id={'descriptionText'}
            value={this.state.descriptionText}
            placeholder="Description"
            multiLine
            rows={1}
            rowsMax={4}
            fullWidth
            onChange={this.onDescChange}
          />
        </Dialog>
      </div>
    );
  }
}
