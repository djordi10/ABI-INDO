import React from 'react';
import {CertificateDetail} from '../../components/CertificateDetail/CertificateDetail';
import {timeConverter} from './../../helpers/timeConverter';
import getConfig from '../../config.js';
import * as nearAPI from 'near-api-js';

const contract_address = "abi-test.testnet";

async function initContract() {
    // get network configuration values from config.js
    // based on the network ID we pass to getConfig()
    const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet'); // if there no env it will default to testnet
  
    // create a keyStore for signing transactions using the user's key
    // which is located in the browser local storage after user logs in
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  
    // Initializing connection to the NEAR testnet
    const near = await nearAPI.connect({ keyStore, ...nearConfig });
  
    // Initialize wallet connection
    const walletConnection = new nearAPI.WalletConnection(near);
  
    // Load in user's account data
    let currentUser;
    if (walletConnection.getAccountId()) {
      currentUser = {
        // Gets the accountId as a string
        accountId: walletConnection.getAccountId(),
        // Gets the user's token balance
        balance: (await walletConnection.account().state()).amount,
      };
    }
  
    // Initializing our contract APIs by contract name and configuration
    const contract = await new nearAPI.Contract(
      // User's accountId as a string
      walletConnection.account(),
      // accountId of the contract we will be loading
      // NOTE: All contracts on NEAR are deployed to an account and
      // accounts can only have one contract deployed to them.
      nearConfig.contractName,
      {
        // View methods are read-only – they don't modify the state, but usually return some value
        viewMethods: ['getMember','checkAdmin'],
      // Change methods can modify the state, but you don't receive the returned value when called
        changeMethods: ['initOwner','addAdmin', 'generateCertificate'],
        // Sender is the account ID to initialize transactions.
        // getAccountId() will return empty string if user is still unauthorized
        sender: walletConnection.getAccountId(),
      }
    );
    return { contract };
}

export default class Certificate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            address:'',
            web3: null,
            name: '', //for testing purposes
            validityDate: '',
            memberSince:'',//kalo perlu
            loading: false,
            contractState: null,
            errorMessage:'Please type the correct member certificate contract address'
        }
    }

    

    
    getAddress = ()=>{
        // let address = window.location.pathname.replace("/",""); //with assumption still no routing
        let { addr } = this.props.match.params;
        
        return addr;
    }
    async componentDidMount(){
        this.setState({loading:true});
        let address = this.getAddress();
        let near = await initContract();
        try{
        const status = await near.contract.getMember({_memberADDR: address})
        await this.fetchCertificate(near,address);   
        }catch(err){
            this.setState({address:'invalid', errorMessage:"The owner of the smart contract is not the correct address."});
        }
    }

    fetchCertificate = async (near,_address)=>{
        let digitalContract;
        let name, validityDate, isActive,memberSince,owner, getError=false;
        try{
            digitalContract = await near.contract.getMember({_memberADDR: _address})
        }catch(err){
            getError = true;
        }
        let now=(+new Date());
        now = now/ 1000;
        try{
            name = digitalContract.name;
            owner = digitalContract.owner;
            isActive = digitalContract.isActive;
            validityDate = digitalContract.validityDate
        }catch(err){
            getError = true;
            name=null;
            validityDate = null;
        }

        if (name && validityDate && name!=null && name!='null' && getError==false && owner != contract_address){
            this.setState({address:'invalid', errorMessage:"The owner of the smart contract is not the correct address."});
        }else if (validityDate <= now || name!=null && name!='null' && getError==true && isActive==false){
            this.setState({address:'invalid', errorMessage:"The company is no longer the member of Asosiasi Blockchain Indonesia."});
        }else if (!name || !validityDate || name==null || name=='null' || getError==true ){
            this.setState({address:'invalid', errorMessage:"Please type the correct member certificate contract address"});
        }else{
            let address = _address
            validityDate = timeConverter(validityDate);
            this.setState({name, validityDate, loading:false,address});
        }
    }

    render(){
        return (<CertificateDetail errorMessage={this.state.errorMessage} loading={this.state.loading} validAddress={this.validAddress} address={this.state.address} name={this.state.name} validityDate={this.state.validityDate}/>);
    }

}
