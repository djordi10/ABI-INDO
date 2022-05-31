import React from 'react';
import { CertificateDetail } from '../../components/CertificateDetail/CertificateDetail';
import './Home.css';
import { Redirect } from "react-router-dom";
let logoPath = process.env.PUBLIC_URL + '/img/logo/ABI.png'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            redirect: false
        }
    }

    componentDidMount() {
    }

    onInputChange = (event) => {
        this.setState({ address: event.target.value });
    }

    handleSubmit = (event)=> {
        event.preventDefault();
        this.setRedirect();
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            let to = "/address/" + this.state.address;
            return <Redirect to={to} />
        }
    }
    render() {
        return (
            <div>
                <div id="myOverlay" className="overlay">
                    <div className="overlay-content">
                        {this.renderRedirect()}
                        <img src={logoPath} className="responsive-logo" />
                        <form onSubmit={this.handleSubmit}>
                            <input value={this.state.address} onChange={this.onInputChange} type="text" placeholder="Enter member certificate address" name="search" />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
