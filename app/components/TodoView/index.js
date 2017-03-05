

import React, { Component, PropTypes } from 'react';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import MobileTearSheet from 'components/MobileTearSheet';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import moment from 'moment';
import _ from 'lodash';

import styles from './styles.scss';

export default class TodoView extends Component {

  static propTypes = {
    note: PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  state = {
    editedNote: null,
    openEditNote: false,
    editTitle: '',
    editDescription: '',
    startEditTitle: false,
    startEditDes: false,
  }

  componentWillMount() {
    this.reset(this.props);
  }

  componentWillReceiveProps(props) {
    this.reset(props);
  }

  onEdit = () => {
    this.setState({
      openEditNote: true,
      editTitle: '',
      editDescription: '',
      startEditTitle: false,
      startEditDes: false,
    });
  }

  onToggleComplete(note) {
    this.context.store.setComplete(note.id, !note.complete)
      .then((noteResult) => {
        this.setState({
          editedNote: noteResult,
        });
      });
  }

  onDelete = () => {
    this.context.store.deleteNote(this.props.note.id)
      .then(() => {
        this.context.router.push('/');
      });
  }

  onTitleChange = (event) => {
    const text = event.target.value;
    this.setState({
      editTitle: text,
      startEditTitle: true,
    });
  }

  onDescChange = (event) => {
    const text = event.target.value;
    this.setState({
      editDescription: text,
      startEditDes: true,
    });
  }

  getEditNoteButtonActionDialog() {
    let isDisabledSubmit = !((this.state.editTitle && _.trim(this.state.editTitle).length)
     || (this.state.editDescription && _.trim(this.state.editDescription).length));

    if (this.state.editDescription && _.trim(this.state.editDescription).length) {
      // Sanity check
      if (this.state.startEditTitle &&
      (!this.state.editTitle || _.trim(this.state.editTitle).length === 0)) {
        isDisabledSubmit = true;
      }
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleCloseEditNote}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        disabled={isDisabledSubmit}
        onTouchTap={this.handleSubmitEditNote}
      />,
    ];

    return actions;
  }

  getStatusText(note) {
    return note.complete ? 'Completed' : 'Active';
  }

  getStatusStylesClass(note) {
    return note.complete ? styles.statusComplete : styles.statusActive;
  }

  getActionsButton(note) {
    const actions = [];
    actions.push(
      <MenuItem
        key="edit"
        primaryText="Edit"
        onTouchTap={this.onEdit}
      />
    );

    const markCompleteText = note.complete ? 'Mark As Active' : 'Mark As Completed';
    actions.push(
      <MenuItem
        key="markComplete"
        primaryText={markCompleteText}
        onTouchTap={() => { this.onToggleComplete(note); }}
      />
    );
    actions.push(
      <MenuItem
        key="delete"
        primaryText="Delete"
        onTouchTap={this.onDelete}
      />
    );

    return actions;
  }

  handleCloseEditNote = () => {
    this.setState({
      editTitle: '',
      editDescription: '',
      openEditNote: false,
      startEditTitle: false,
      startEditDes: false,
    });
  }

  handleSubmitEditNote = (e) => {
    e.preventDefault();

    const note = this.context.store.getNoteById(this.props.note.id);
    const editedTitle = this.state.editTitle && _.trim(this.state.editTitle).length ?
        this.state.editTitle : note.title;
    const editedDescription = this.state.editDescription && _.trim(this.state.editDescription).length ?
        this.state.editDescription : note.description;
    note.title = editedTitle;
    note.description = editedDescription;

    return this.context.store.updateNote(note)
        .then((resultNote) => {
          this.setState({
            openEditNote: false,
            editTitle: '',
            editDescription: '',
            startEditTitle: false,
            startEditDes: false,
            editedNote: resultNote,
          });
        })
        .catch((err) => {
          alert(`Edit note error : ${err}`);
        });
  }

  reset(props) {
    this.setState({
      editedNote: props.note,
      editTitle: '',
      editDescription: '',
      startEditTitle: false,
      startEditDes: false,
    });
  }

  render() {
    const momentDate = moment(this.props.note.date);
    const dateString = momentDate.format('DD MMMM YYYY');

    const note = this.state.editedNote || this.props.note;

    const statusClass = this.getStatusStylesClass(note);

    return (
      <div className={styles.container}>
        <MobileTearSheet height={800}>
          <List>
            <ListItem insetChildren={false} disabled>
              <span className={styles.date}>
                {dateString}
              </span>

              <div className={styles.actionContainer}>
                <IconMenu
                  iconButtonElement={
                    <IconButton
                      style={{ position: 'relative', top: -3 }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    }
                  anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  {this.getActionsButton(note)}
                </IconMenu>
              </div>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem insetChildren={false} disabled>
              <span className={styles.statusHeader}>
                Status
              </span>
            </ListItem>
            <ListItem insetChildren={false} disabled>
              <span className={statusClass}>
                {this.getStatusText(note)}
              </span>
            </ListItem>
          </List>
          <Divider />
          <Divider />
          <List>
            <ListItem insetChildren={false} disabled>
              <span className={styles.titleHeader}>
                Title
              </span>
            </ListItem>
            <ListItem insetChildren={false} disabled>
              <span className={styles.titleBody}>
                {note.title}
              </span>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem insetChildren={false} disabled>
              <span className={styles.descriptionHeader}>
                Description
              </span>
            </ListItem>
            <ListItem insetChildren={false} disabled>
              <span className={styles.description}>
                {note.description}
              </span>
            </ListItem>
          </List>
        </MobileTearSheet>

        <Dialog
          title="Edit Note"
          actions={this.getEditNoteButtonActionDialog()}
          modal={false}
          open={this.state.openEditNote}
          onRequestClose={this.handleCloseEditNote}
        >
          <TextField
            id={'titleText'}
            value={
              this.state.startEditTitle ? this.state.editTitle : note.title
            }
            placeholder="Title"
            multiLine={false}
            fullWidth
            onChange={this.onTitleChange}
          />
          <TextField
            id={'descriptionText'}
            value={
               this.state.startEditDes ? this.state.editDescription : note.description
            }
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
