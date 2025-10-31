import {User} from './user';

export class Submission {
  id: number | undefined;
  restaurantName: string;
  user: User;
  date: Date;

  constructor(nom_restaurant: string, user: User, date: Date) {
    this.restaurantName = nom_restaurant;
    this.user = user;
    this.date = date;
  }
}
