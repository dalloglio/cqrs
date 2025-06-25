import { QueryBus } from '../@core/query/query-bus';
import { Account } from '../account';
import { IAccountRepository } from '../account-repository';
import { GetAccountByIdQuery } from './get-account-by-id.query';
import { GetAccountByIdQueryHandler } from './handlers/get-account-by-id.handler';
import { ListAccountsQueryHandler } from './handlers/list-accounts.handler';
import { ListAccountsQuery } from './list-accounts.query';

describe('QueryBus Integration', () => {
  let queryBus: QueryBus;
  let repository: jest.Mocked<IAccountRepository>;
  let account: Account;
  let accounts: Account[];

  beforeEach(() => {
    queryBus = new QueryBus();
    repository = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    account = new Account('test@example.com', 'Str0ngP@ssw0rd!');
    accounts = [account, new Account('a@a.com', 'An0ther$trong1')];
    queryBus.register(GetAccountByIdQuery, new GetAccountByIdQueryHandler(repository));
    queryBus.register(ListAccountsQuery, new ListAccountsQueryHandler(repository));
  });

  it('should dispatch GetAccountByIdQuery to the correct handler', async () => {
    repository.findById.mockResolvedValue(account);
    const result = await queryBus.execute(new GetAccountByIdQuery(account.id));
    expect(result).toBe(account);
    expect(repository.findById).toHaveBeenCalledWith(account.id);
  });

  it('should dispatch ListAccountsQuery to the correct handler', async () => {
    repository.findAll.mockResolvedValue(accounts);
    const result = await queryBus.execute(new ListAccountsQuery());
    expect(result).toBe(accounts);
    expect(repository.findAll).toHaveBeenCalled();
  });
}); 