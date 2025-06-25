import { Account } from '../../account';
import { IAccountRepository } from '../../account-repository';
import { GetAccountByIdQuery } from '../get-account-by-id.query';

export class GetAccountByIdQueryHandler {
  constructor(private readonly repository: IAccountRepository) {}

  async execute(query: GetAccountByIdQuery): Promise<Account | null> {
    return this.repository.findById(query.id);
  }
} 