

import React, { Component, PropTypes } from 'react';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

import styles from './styles.scss';

export default class TodoList extends Component {

  static propTypes = {
    enableSelectAll: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    fixedFooter: PropTypes.bool,
    stripedRows: PropTypes.bool,
    showRowHover: PropTypes.bool,
    selectable: PropTypes.bool,
    multiSelectable: PropTypes.bool,
    deselectOnClickaway: PropTypes.bool,
    height: PropTypes.string,

    // Array data for render
    listData: PropTypes.array.isRequired,
    onTouchList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    displaySelectAll: true,
    adjustForCheckbox: true,
    enableSelectAll: true,
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    deselectOnClickaway: true,
    height: '300px',
  }

//   static contextTypes = {
//     NotificationManager: PropTypes.object.isRequired,
//     router: PropTypes.object.isRequired,
//     store: PropTypes.object.isRequired,
//     debug: PropTypes.func.isRequired,
//   }

  state = {
    listDataSelect: {},
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
      height,
      fixedHeader,
      fixedFooter,
      selectable,
      multiSelectable,
      enableSelectAll,
      stripedRows,
      showRowHover,
      deselectOnClickaway,
      listData,
      onTouchList,
    } = this.props;

    return (
      <div className={styles.container}>
        <Table
          height={height}
          fixedHeader={fixedHeader}
          fixedFooter={fixedFooter}
          selectable={selectable}
          multiSelectable={multiSelectable}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn className={styles.tableHeader} colSpan="3">
                Reminders
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={deselectOnClickaway}
            showRowHover={showRowHover}
            stripedRows={stripedRows}
          >
            <TableRow selectable={false}>
              <TableRowColumn className={styles.checkboxHeader}></TableRowColumn>
              <TableRowColumn className={styles.noteHeader}>Note</TableRowColumn>
            </TableRow>
            {listData.map((row, index) => (
              <TableRow key={index} selected={!!this.state.listDataSelect[row.id]}>
                <TableRowColumn className={styles.checkboxRow}>
                  <Checkbox onTouchTap={() => { this.onSelectList(row.id); }} />
                </TableRowColumn>
                <TableRowColumn onTouchTap={() => { onTouchList(row.id); }}>{row.name}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  onSelectList(todoId) {
    const listDataSelect = this.state.listDataSelect || {};
    listDataSelect[todoId] = !listDataSelect[todoId];
    this.setState({
      listDataSelect,
    });
  }
}
