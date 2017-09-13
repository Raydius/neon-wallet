import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { getWIFFromPrivateKey } from 'neon-js';

import {ledgerNanoS_AsynchGetInfo,ledgerNanoS_PublicKey,ledgerNanoS_DeviceInfo,ledgerNanoS_Login} from '../modules/ledgerNanoS';

const logo = require('../images/neon-logo2.png');

const onWifChange = (dispatch, value) => {
  // TODO: changed back to only WIF login for now, getting weird errors with
	// private key hex login
  dispatch(login(value));
};

const onLedgerNanoSChange = ( dispatch ) => {
    if ( ledgerNanoS_PublicKey != undefined ) {
        dispatch( ledgerNanoS_Login() );
    }
}

let Login = ({ dispatch, loggedIn, wif }) =>
  <div id="loginPage">
    <div className="login">
      <div className="logo"><img src={logo} width="60px"/></div>
      <input type="text" placeholder="Enter your private key here (WIF)" onChange={(e) => onWifChange(dispatch, e.target.value)} />
      <div className="loginButtons">
        {loggedIn ? <Link to="/dashboard"><button>Login</button></Link> : <button disabled="true">Login</button>}
        <Link to="/create"><button>New Wallet</button></Link>
        <button onClick={(e) => onLedgerNanoSChange(dispatch)}>Use Ledger Nano S</button>
      </div>
      <div id="ledger_detection">{ledgerNanoS_DeviceInfo}</div>
      <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

ledgerNanoS_AsynchGetInfo();

Login = connect(mapStateToProps)(Login);

export default Login;
