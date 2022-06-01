import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function FormAdmin({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Add Admin</p>
        <p className="highlight">
          <label htmlFor="admin_address">Admin Near Address:</label>
          <input
            autoComplete="off"
            autoFocus
            id="admin_address"
            required
          />
        </p>
        <button type="submit">
          Add
        </button>
      </fieldset>
    </form>
  );
}

FormAdmin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
