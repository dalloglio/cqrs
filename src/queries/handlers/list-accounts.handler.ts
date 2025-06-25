import { Account } from '../../account';
import { IAccountRepository } from '../../account-repository';
import { ListAccountsQuery } from '../list-accounts.query';

export class ListAccountsQueryHandler {
  constructor(private readonly repository: IAccountRepository) {}

  async execute(query: ListAccountsQuery): Promise<Account[]> {
    return this.repository.findAll();
  }
} 
