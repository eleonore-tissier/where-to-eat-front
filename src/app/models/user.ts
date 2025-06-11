import {Role} from './role.model';

export class User {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  points: number = 0;
  role: Role | undefined;
}
