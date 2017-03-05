/**
 * 404 error page
 */

import React, { Component, PropTypes } from 'react';
import TodoList from 'components/TodoList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';



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

  render() {
    const tableData = [
    {
        id: 1,
        name: 'John Smith',
        status: 'Employed',
        selected: true,
    },
    {
        id: 2,
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        id: 3,
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        id: 4,
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        id: 5,
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        id: 6,
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        id: 7,
        name: 'Adam Moore',
        status: 'Employed',
    },
    ];

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
                height={`${this.state.windowHeight - 60}px`}
              />
            </Tab>
            <Tab label="Completed" >
              <TodoList
                listData={this.getNotes({ filter: 'completed' })}
                onTouchList={this.onTouchList}
                height={`${this.state.windowHeight - 60}px`}
              />
            </Tab>
            <Tab label="Active">
              <TodoList
                listData={this.getNotes({ filter: 'active' })}
                onTouchList={this.onTouchList}
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
            fullWidth={true}
            onChange={this.onTitleChange}
          />
          <TextField
            id={'descriptionText'}
            value={this.state.descriptionText}
            placeholder="Description"
            multiLine={true}
            rows={1}
            rowsMax={4}
            fullWidth={true}
            onChange={this.onDescChange}
          />
        </Dialog>
      </div>
    );
  }

  getNotes(options = {}) {
    const notes = this.context.store.getNotes(options);
    return notes;
  }

  onTitleChange = (event) => {
    this.setState({ titleText: event.target.value });
  }

  onDescChange = (event) => {
    this.setState({ descriptionText: event.target.value });
  }

  getAddNoteButtonActionDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseAddNote}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmitAddNote}
      />,
    ];

    return actions;
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
          });
        })
        .catch((err) => {
          alert(`Add note error : ${err}`);
        });
  }

  handleCloseAddNote = () => {
    this.setState({
      openAddNote: false,
      descriptionText: '',
      titleText: '',
    });
  }

  onAddNote = (e) => {
    e.preventDefault();
    this.setState({
      openAddNote: true,
      descriptionText: '',
      titleText: '',
    });
  }

  onTouchList = (listID) => {
    const nextRoute = `/TodoDetail/${listID}`;
    this.context.router.push(nextRoute);
  }
}
