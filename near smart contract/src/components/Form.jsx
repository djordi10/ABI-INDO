import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Generate the cerificate</p>
        <p className="highlight">
          <label htmlFor="name">Name:</label>
          <input
            autoComplete="off"
            autoFocus
            id="name"
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
          Generate
        </button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
