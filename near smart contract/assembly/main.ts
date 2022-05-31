import { Admin, mapAdmin, Owner, ownerContract, member, MemberCertificate } from './model';
import {
  context, // visibility into account, contract and blockchain details
} from "near-sdk-as";
// --- contract code goes below


/**
 * 
 * Init this smart contract as started
 * 
 * 
 */
 export function initOwner(): void {
  // Creating a new message and populating fields with our data
  //init contract owner
  assert(ownerContract.length == 0,"Owner already initialized");
  const Owners = new Owner(context.sender);
  ownerContract.push(Owners);
  const newAdmin = new Admin(context.sender);//set owner as admin
  // Adding new admin to Admin vector colleciton
  mapAdmin.set(context.sender,newAdmin);
}

/**
 * 
 * Add a new admin user who can add generate new ABI Member 
 * 
 * 
 */
export function addAdmin(_address: string): void {
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  const newAdmin = new Admin(_address);
  // Adding new admin to Admin vector colleciton
  mapAdmin.set(_address,newAdmin);
}

/**
 * 
 * Add a new ABI member 
 * 
 * 
 */
export function generateCertificate(_name: string, _validityDate: u32, _memberADDR:string ): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  const newMember = new MemberCertificate(context.sender, _validityDate, _name)

  member.set(_memberADDR,newMember)
}

/**
 * 
 * Add ABI Member according to near address 
 * 
 * 
 */
export function getMember(_memberADDR: string): MemberCertificate | null{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(member.contains(_memberADDR),"member does not exist")
  const currentMember = member.get(_memberADDR);
  return currentMember;
}

/**
 * 
 * Set ABI Member Validity Date
 * 
 * 
 */
 export function setMemberDate(_memberADDR: string,_validityDate: u32): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  assert(member.contains(_memberADDR),"member does not exist")
  const currentMember = member.get(_memberADDR);
  currentMember?.setValidityDate(_validityDate);
}

/**
 * 
 * Set ABI Member Name
 * 
 * 
 */
 export function setMemberName(_memberADDR: string,_name: string): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  assert(member.contains(_memberADDR),"member does not exist")
  const currentMember = member.get(_memberADDR);
  currentMember?.setName(_name);
}

/**
 * 
 * check if admin or not 
 * 
 * 
 */
export function checkAdmin(_address: string): bool {
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  if(mapAdmin.contains(_address)){
    return true
  }

  return false;
}

