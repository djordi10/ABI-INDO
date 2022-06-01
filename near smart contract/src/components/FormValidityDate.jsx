import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function FormValidityDate({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Update the validity date</p>
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
          <label htmlFor="epoch">Validity Epoch:</label>
          <input
            autoComplete="off"
            autoFocus
            id="epoch"
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

FormValidityDate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
