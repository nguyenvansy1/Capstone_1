import {Course} from './course';
import {Majors} from './majors';
import {Account} from './account';
import {Class} from './class';

export interface User {
  code?: number;
  name?: string;
  identityCard?: number;
  phone?: number;
  birthDay?: string;
  gender?: boolean;
  since?: string;
  avatar?: string;
  address?: string;
  account?: Account;
  course?: Course;
  majors?: Majors;
  classUser?: Class;
}
