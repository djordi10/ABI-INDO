import {  PersistentVector, PersistentMap } from "near-sdk-as";

@nearBindgen
export class Owner {
  address: string;
  called: bool;
  constructor(public _address: string) {
    this.address = _address;
    this.called = true;
  }

}
@nearBindgen
export class Admin {
  address: string;
  active: bool;
  constructor(public _address: string) {
    this.address = _address;
    this.active = true;
  }

  setAdminStatus(status: bool):void {
    this.active = status;
  }
}
@nearBindgen
export class MemberCertificate {
  creator: string;
  validityDate: u32;
  name: string;

  constructor(public _creator: string, public _validityDate:u32, public _name:string) {
    this.creator = _creator;
    this.validityDate = _validityDate;
    this.name = _name;
  }

  setName(_name:string):void{
    this.name = _name;
  }


  setValidityDate(_validityDate:u32):void{
    this.validityDate = _validityDate;
  }

}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */

export const mapAdmin = new PersistentMap<string, Admin>("m");

export const ownerContract = new PersistentVector<Owner>("m");

export const member = new PersistentMap<string, MemberCertificate>("m");

