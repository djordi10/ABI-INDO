import React from 'react';
import QrCode from 'qrcode.react';
import { Link } from 'react-router-dom';

export const CertificateDetail = (props) => {
    let logoPath = process.env.PUBLIC_URL + '/img/logo/' + props.name + '.png'
    let nearexplorerLink = "https://explorer.testnet.near.org/accounts/" + props.address;
    return (
        props.address === 'invalid' ?
            (
                <div>
            <div className="ErrorMessage">{props.errorMessage}
            <br/><Link to='/'><button className="ErrorButton">Back to Home</button></Link></div>
            
            </div>
            )
            : props.loading? 
                <div className="Loading"></div>
                :(// if not loading and get contract detail sucessfully
                // <div className='container mx-auto container-parent'>   
                <div className='container container-parent'>   
                    <div className="card text-black">
                        <img style={{height: 'auto', width:'100%', position:'relative'}} src={process.env.PUBLIC_URL + '/img/abi-certificate-layout.jpg'} alt="Card-Image" />
                        <div className="card-img-overlay">
                            <div className='container-row'>
                                <div className='qrCode'>
                                    <QrCode value={nearexplorerLink} />
                                    <a href={nearexplorerLink} role="button" className="btn btn-primary btn-block btn-abi"target="_blank">Check on Near Explorer</a>
                                </div>
                                <div className="card-text container-top1">
                                    <div className='row'>
                                        <div className="col-3">
                                        </div>
                                        <div className='text-center logo-top1 col-6'>
                                            <img className='img-logo' style={{}} id='img-logo-top' src={process.env.PUBLIC_URL + '/img/logo/ABI.png'} />
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                </div>
                                <div className="card-text mx-auto container-mid1">
                                    <div className='text-center logo-mid1'>
                                        <img className='img-logo' style={{padding: '0.5rem', marginTop:'-15px'}} id='img-logo-mid' src={logoPath} />
                                    </div>
                                </div>
                                <div className="card-text mx-auto container-mid2">
                                    <div className='text-center text-mid1'>
                                        Member until: <span id='date'>{props.validityDate}</span>
                                    </div>
                                </div>
                                <div className="card-text mx-auto container-bot1">
                                    <div className='text-center text-bot1'>
                                        Muhammad Deivito Dunggio
                                    </div>
                                </div>
                                <div className="card-text mx-auto container-bot2">
                                    <div className='text-center text-bot2 p-0 m-0'>
                                        <span id='head-title'> CHAIRMAN </span><br />
                                        <span id='head-name'>ASOSIASI BLOCKCHAIN INDONESIA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center text-bot2 p-0 m-0'>
                        Powered by <a href={"https://www.youtube.com/friendswithblockchain"} target={"_blank"}>Friends with Blockchain</a>
                    </div>
                </div>
            )
    );
}