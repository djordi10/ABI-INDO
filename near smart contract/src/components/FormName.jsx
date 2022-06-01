import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function FormName({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Update member name</p>
        <p className="highlight">
          <label htmlFor="member_address">Member Near Address:</label>
          <input
            autoComplete="off"
            autoFocus
            id="member_address"
            required
          />
        </p>
        <p className="highlight">
          <label htmlFor="name">Name:</label>
          <input
            autoComplete="off"
            autoFocus
            id="name"
            required
          />
        </p>
        <button type="submit">
          Update
        </button>
      </fieldset>
    </form>
  );
}

FormName.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
