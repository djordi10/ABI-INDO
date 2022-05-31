import React from 'react';
import {CertificateDetail} from '../../components/CertificateDetail/CertificateDetail';

export default class NotFound extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            address:'0x949c0e4345b1F6dbBbbc568C57Bf369911e2152e',
            web3: null,
            name: '', //for testing purposes
            memberSince: null,
            loading: false,
        }
    }

    getAddress = ()=>{
        return 'invalid';
    }
    componentDidMount(){
        this.setState({loading:true})
        let address = this.getAddress();
        this.setState({address},()=>{
            this.fetchCertificate();
        })
    }

    fetchCertificate = async ()=>{
        this.setState({name:'', memberSince:'', loading:false});
    }

    render(){
        return (<CertificateDetail loading={this.state.loading} validAddress={this.validAddress} address={this.state.address} name={this.state.name} memberSince={this.state.memberSince}/>);
    }

}
