/**
 * @class LayoutRoot
 *
 * Root Layout
 */

import React, { Component, PropTypes } from 'react';

export default class LayoutRoot extends Component {

  static defaultProps = {
    children: null,
  }

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
