import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import FormInit from './components/FormInit';
import FormName from './components/FormName';
import FormAdmin from './components/FormAdmin';
import FormValidityDate from './components/FormValidityDate';
import SignIn from './components/SignIn';


const App = ({ contract, currentUser, nearConfig, wallet }) => {

  useEffect(() => {
  }, []);

  const generateCertificate = (e) => {
    e.preventDefault();

    const { fieldset, name, epoch } = e.target.elements;
    fieldset.disabled = true;

    // TODO: call generate certificate for member
    contract.generateCertificate(
      { _name: name.value, _validityDate: epoch.value }
    ).then(() => {
      fieldset.disabled = false;
    });
  };

  const initOwner = (e) => {
    e.preventDefault();

    console.log("init")
    //fieldset.disabled = true;

    // TODO: call init owner for smart contract (owner here functioning for adding admin that can generate certificate)
    contract.initOwner(
    ).then(() => {
      alert("init success")
    });
  };

  const addAdmin = (e) => {
    e.preventDefault();

    const { admin_address } = e.target.elements;
    fieldset.disabled = true;

    // TODO: call init owner for smart contract (owner here functioning for adding admin that can generate certificate)
    contract.addAdmin(
      { _address: admin_address.value}
    ).then(() => {
      alert("add admin success")
      fieldset.disabled = false;
    });
  };

  const updateValidity = (e) => {
    e.preventDefault();

    const { member_address, epoch } = e.target.elements;
    fieldset.disabled = true;

    // TODO: call init owner for smart contract (owner here functioning for adding admin that can generate certificate)
    contract.setMemberDate(
      { _memberADDR: member_address.value, _validityDate: epoch.value}
    ).then(() => {
      alert("update validity success")
      fieldset.disabled = false;
    });
  };

  const updateName = (e) => {
    e.preventDefault();

    const { member_address, name } = e.target.elements;
    fieldset.disabled = true;

    // TODO: call init owner for smart contract (owner here functioning for adding admin that can generate certificate)
    contract.setMemberName(
      { _memberADDR: member_address.value, _name: name.value}
    ).then(() => {
      alert("update name success")
      fieldset.disabled = false;
    });
  };

  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: [contract.addAdmin.name]}, //contract requesting access
      'NEAR Certificate ABI', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR Certificate ABI</h1>
        { currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      { currentUser
        ? 
        <div>
        <FormInit onSubmit={initOwner} currentUser={currentUser} />
        <FormAdmin onSubmit={addAdmin} currentUser={currentUser} />
        <Form onSubmit={generateCertificate} currentUser={currentUser} />
        <FormValidityDate onSubmit={updateValidity} currentUser={currentUser} />
        <FormName onSubmit={updateName} currentUser={currentUser} />
        </div>
        : <SignIn/>
      }
      { !!currentUser  }
    </main>
  );
};
App.propTypes = {
  contract: PropTypes.shape({
    getMember: PropTypes.func.isRequired,
    checkAdmin: PropTypes.func.isRequired,
    initOwner: PropTypes.func.isRequired,
    addAdmin: PropTypes.func.isRequired,
    generateCertificate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
