export type Transaction = {
  id: number,
  value: string,
  debitedAccountId: number,
  creditedAccountId: number,
  createdAt: string,
  creditedAccount: { id: number, user: { username: string} },
  debitedAccount: { id: number, user: { username: string} },
};

export type User = {
  username: string,
  password: string,
}

export type RequestTransaction = {
  username: string,
  value: number,
}