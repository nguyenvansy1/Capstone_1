import {Customer} from './customer';

export interface Event {
  id?: number;
  name?: string;
  location?: string;
  content?: string;
  startTime?: string;
  endTime?: string;
  customer?: Customer;
  flag?: boolean;
}
