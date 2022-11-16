import Account from '../database/models/Account';

const INITIAL_BALANCE = '100,00';

export async function createAccount() {
  const account = await Account.create({ balance: INITIAL_BALANCE });
  console.log(account);

  return { status: 201, account };
}

// class AccountService {
//   static createAccount = async ():Promise<any | null> => {
//     const account = await Account.create({
//       balance: INITIAL_BALANCE,
//     });

//     return account.dataValues.id;
//   };
// }

// export default AccountService;
