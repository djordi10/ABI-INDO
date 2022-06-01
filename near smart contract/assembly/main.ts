import { Admin, mapAdmin, Owner, ownerContract, member, MemberCertificate } from './model';
import {
  context, // visibility into account, contract and blockchain details
  ContractPromiseBatch,
  Context,
  u128
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
export function generateCertificate(_name: string, _validityDate: u64 ): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")

  let new_account_id = _name+"."+ context.contractName;
  const signer_account_pk = context.senderPublicKey;
  const current_account_id = context.contractName;
  const amount: u128 = u128.from("1000000000000000000000") // 0.001 NEAR

  ContractPromiseBatch.create(new_account_id) //create new subaccount 
    .create_account() //create the account
    .transfer(amount)//need near for initializazing account
    .then(current_account_id) // the callback is on the current_account_id
    
  const newMember = new MemberCertificate(context.sender, _validityDate, _name)
  member.set(new_account_id,newMember)
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
 export function setMemberDate(_memberADDR: string,_validityDate: u64): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  assert(member.contains(_memberADDR),"member does not exist")
  let currentMember = member.get(_memberADDR);
  currentMember!.setValidityDate(_validityDate)
  member.set(_memberADDR,currentMember!)
}

/**
 * 
 * Set ABI Member Active
 * 
 * 
 */
 export function setMemberActive(_memberADDR: string,_isActive: bool): void{
  assert(ownerContract.length > 0,"Smart Contract not initialized");
  assert(mapAdmin.contains(context.sender),"sender is not Admin")
  assert(member.contains(_memberADDR),"member does not exist")
  let currentMember = member.get(_memberADDR);
  currentMember!.setActive(_isActive)
  member.set(_memberADDR,currentMember!)
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
  let currentMember = member.get(_memberADDR);
  currentMember!.setName(_name)
  member.set(_memberADDR,currentMember!)
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