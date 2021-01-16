import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../API/api';

export class CurrentUser extends React.Component {
  state = {
    info: {},
  }

  componentDidMount() {
    this.loadedData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.loadedData();
    }
  }

  loadedData() {
    getUser(this.props.userId)
      .then(info => (
        this.setState({ info })
      ));
  }

  render() {
    const { info } = this.state;
    const { updateUserId } = this.props;

    return (
      <div className="CurrentUser">
        {Object.keys(info).length === 0
          ? (
            <div className="center">
              <div className="lds-ring">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>

          )
          : (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {info.id}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{info.name}</h3>
              <p className="CurrentUser__email">{info.email}</p>
              <p className="CurrentUser__phone">{info.phone}</p>
              <button
                type="button"
                className="CurrentUser__clear"
                onClick={() => {
                  updateUserId(0);
                }}
              >
                Clear
              </button>
            </>
          )

        }
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.string.isRequired,
  updateUserId: PropTypes.func.isRequired,
};
