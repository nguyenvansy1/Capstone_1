import {User} from './user';
import {Event} from './event';
export interface EventUser {
  id?: number;
  status?: boolean;
  checkin?: string;
  event?: Event;
  user?: User;
}
