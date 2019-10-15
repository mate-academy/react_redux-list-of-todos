import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import shortid from 'shortid';
import { store } from '../../store/reducers';
import { setFilterPattern } from '../../store/action';

import './Dropdown.scss';

export default class Dropdown extends Component {
  state = {
    isOpen: false,
  };

  handleDropdownToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  handleDropdownSelect = (e) => {
    this.setState({ isOpen: false });
    store.dispatch(setFilterPattern(e.target.dataset.value));
  };

  render() {
    const { title, itemsList } = this.props;

    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleDropdownToggle}
        >
          {title}
        </button>
        <div
          className={classNames('dropdown-menu', {
            show: this.state.isOpen,
          })}
          aria-labelledby="dropdownMenuButton"
        >
          {itemsList.map((item) => (
            <p
              key={shortid.generate()}
              className="dropdown-item"
              data-value={item.value}
              onClick={this.handleDropdownSelect}
            >
              {item.option}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};
