import { Account } from './account';

export interface IAccountRepository {
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
} 
