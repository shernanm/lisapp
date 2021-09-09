import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { bool, func } from 'prop-types';

import styles from './styles.module.scss';
import { PORTAL_ROOT } from './constants';

class Portal extends Component {
  el = document.createElement('div');

  componentDidMount() {
    if (this.props.captureEvents) {
      this.el.classList.add(styles.captureEvents);
    }
    this.el.classList.add(styles.container);
    PORTAL_ROOT.appendChild(this.el);
  }

  componentWillUnmount() {
    PORTAL_ROOT.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDom.createPortal(children, this.el);
  }
}

Portal.propTypes = {
  captureEvents: bool
};

export default Portal;
