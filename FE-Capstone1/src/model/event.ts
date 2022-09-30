import {Customer} from './customer';

export interface Event {
  id?: number;
  name?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  customer?: Customer;
}
