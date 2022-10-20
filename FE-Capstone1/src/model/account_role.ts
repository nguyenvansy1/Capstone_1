import {Role} from './role';
import {Account} from './account';

export interface AccountRole {
  id?: number;
  account?: Account;
  role?: Role;
}
