import Account from '../models/Account'

var accountList: Array<Account> = new Array<Account>();
  
export const saveAccount = (account: Account) => {
    accountList.push(account);
}