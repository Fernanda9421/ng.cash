export interface ITransaction {
  id: number,
  value: number,
  debitedAccountId: number,
  creditedAccountId: number,
  createdAt: string,
  creditedAccount: {
    id: number,
    user: {
      username: string
    }
  },
  debitedAccount: {
    id: number,
    user: {
      username: string
    }
  }
};

export interface ITableTransaction {
  transactions: ITransaction[] | [];
  title: string;
  head1: string;
  head2: string;
  head3: string;
  type: string;
};
