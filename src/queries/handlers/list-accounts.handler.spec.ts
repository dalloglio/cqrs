import { Account } from '../../account';
import { IAccountRepository } from '../../account-repository';
import { ListAccountsQuery } from '../list-accounts.query';
import { ListAccountsQueryHandler } from './list-accounts.handler';

describe('ListAccountsQueryHandler', () => {
  let repository: jest.Mocked<IAccountRepository>;
  let handler: ListAccountsQueryHandler;
  const accounts = [
    new Account('a@a.com', 'Str0ngP@ssw0rd!'),
    new Account('b@b.com', 'An0ther$trong1'),
  ];

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    handler = new ListAccountsQueryHandler(repository);
  });

  it('should return all accounts', async () => {
    repository.findAll.mockResolvedValue(accounts);
    const result = await handler.execute(new ListAccountsQuery());
    expect(result).toBe(accounts);
    expect(repository.findAll).toHaveBeenCalled();
  });
}); 
