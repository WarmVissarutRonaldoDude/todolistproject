/**
 * 404 error page
 */

import React, { Component, PropTypes } from 'react';
import TodoList from 'components/TodoList';
import IconButton from 'material-ui/IconButton';
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
  }

  state = {
    openAddNote: false,
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
          <IconButton
            tooltip="Add note"
            tooltipPosition="bottom-center"
            onTouchTap={this.onAddNote}
          >
            <ContentAdd />
          </IconButton>
        </div>

        <Tabs>
            <Tab label="All" >
              <TodoList
                listData={tableData}
                onTouchList={this.onTouchList}
              />
            </Tab>
            <Tab label="Completed" >
              <TodoList
                listData={[]}
                onTouchList={this.onTouchList}
              />
            </Tab>
            <Tab label="Active">
              <TodoList
                listData={tableData}
                onTouchList={this.onTouchList}
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
            hintText="Note"
            multiLine={true}
            rows={1}
            rowsMax={4}
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
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

    // TODO Add note to storage

    this.setState({
      openAddNote: false,
    });
  }

  handleCloseAddNote = () => {
    this.setState({
      openAddNote: false,
    });
  }

  onAddNote = (e) => {
    e.preventDefault();
    this.setState({
      openAddNote: true,
    });
  }

  onTouchList = (listID) => {
    const nextRoute = `/TodoDetail/${listID}`;
    this.context.router.push(nextRoute);
  }
}
