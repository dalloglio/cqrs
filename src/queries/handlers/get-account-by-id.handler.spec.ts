import { Account } from '../../account';
import { IAccountRepository } from '../../account-repository';
import { GetAccountByIdQuery } from '../get-account-by-id.query';
import { GetAccountByIdQueryHandler } from './get-account-by-id.handler';

describe('GetAccountByIdQueryHandler', () => {
  let repository: jest.Mocked<IAccountRepository>;
  let handler: GetAccountByIdQueryHandler;
  const account = new Account('test@example.com', 'Str0ngP@ssw0rd!');

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      findAll: jest.fn(),
    };
    handler = new GetAccountByIdQueryHandler(repository);
  });

  it('should return the account for a valid ID', async () => {
    repository.findById.mockResolvedValue(account);
    const result = await handler.execute(new GetAccountByIdQuery(account.id));
    expect(result).toBe(account);
    expect(repository.findById).toHaveBeenCalledWith(account.id);
  });

  it('should return null for a non-existent ID', async () => {
    repository.findById.mockResolvedValue(null);
    const result = await handler.execute(new GetAccountByIdQuery('non-existent-id'));
    expect(result).toBeNull();
    expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
  });
}); 
