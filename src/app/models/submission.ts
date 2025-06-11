export class Submission {
  restaurantName: string;
  userId: number;
  date: Date;

  constructor(nom_restaurant: string, user_id: number, date: Date) {
    this.restaurantName = nom_restaurant;
    this.userId = user_id;
    this.date = date;
  }
}
