import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function FormInit({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Welcome , { currentUser.accountId }!</p>
        <p>Init contract</p>
        <button type="submit">
          INIT
        </button>
      </fieldset>
    </form>
  );
}

FormInit.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
