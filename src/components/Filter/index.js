import React, { Component } from 'react';
import { connect } from 'react-redux';

import filterActions from '../../redux/Filter/actions';

import { FILTERS } from './constants';
import styles from './styles.module.scss';

class Filter extends Component {
  childrenRef = React.createRef();

  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    if (this.childrenRef.current && !this.childrenRef.current.contains(event.target)) {
      this.props.hiddenFilter();
    }
  };

  handleCurrentFilter = (filter) => {
    this.props.setCurrentFilter(filter);
    this.props.hiddenFilter();
  };

  render() {
    return (
      <div ref={this.childrenRef} className={styles.container}>
        {Object.values(FILTERS).map(({ text, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              this.handleCurrentFilter(key);
            }}
            className={styles.item}
          >
            <h3 className={styles.title}>{text}</h3>
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hiddenFilter: () => dispatch(filterActions.showFilter()),
  setCurrentFilter: (filter) => dispatch(filterActions.setCurrentFilter(filter))
});

export default connect(null, mapDispatchToProps)(Filter);
