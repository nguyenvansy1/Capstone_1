import {Course} from './course';
import {Majors} from './majors';

export interface User {
  code?: number;
  name?: string;
  identityCard?: number;
  phone?: number;
  birthDay?: string;
  course?: Course;
  majors?: Majors;
}
