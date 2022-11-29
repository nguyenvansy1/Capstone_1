import {Account} from './account';

export interface Customer {
  id?: number;
  name?: string;
  account?: Account;
  address?: string;
  avatar?: string;
}
