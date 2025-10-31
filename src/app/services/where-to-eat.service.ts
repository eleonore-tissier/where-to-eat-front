import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {Submission} from '../models/submission';
import {Season} from '../models/season';
import {User} from '../models/user';
import {Role} from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class WhereToEatService {

  private whereToEatUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public login(firstName: string, lastName: string) {
    const params: HttpParams = new HttpParams().set('firstName', firstName).set('lastName', lastName);
    return this.http.get(this.whereToEatUrl + 'login', {params, observe: 'response'});
  }

  public getRestaurants() {
    return this.http.get(this.whereToEatUrl + 'restaurants', {observe: 'response'});
  }

  public getRestaurantByName(name: string){
    const params: HttpParams = new HttpParams().set('name', name);
    return this.http.get(this.whereToEatUrl + 'findRestaurant', {params , observe: 'response'});
  }

  public getRestaurantsInSubmissions(){
    return this.http.get(this.whereToEatUrl + 'restaurantsInSubmissions', {observe: 'response'});
  }

  public getSubmissions() {
    return this.http.get(this.whereToEatUrl + 'submissions', {observe: 'response'});
  }

  public submitRestaurant(restaurantName: string, eventDate: string, userId: string) {
    const params: HttpParams = new HttpParams().set('restaurantName', restaurantName).set('eventDate', eventDate).set('userId', userId);
    return this.http.post(this.whereToEatUrl + 'submitRestaurant', params, {observe: 'response'});
  }

  public getSeasons() {
    return this.http.get(this.whereToEatUrl + 'seasons', {observe: 'response'});
  }

  public getCurrentSeason() {
    return this.http.get(this.whereToEatUrl + 'currentSeason', {observe: 'response'});
  }

  public getUsers() {
    return this.http.get(this.whereToEatUrl + 'users', {observe: 'response'});
  }

  public getUser(id: number) {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.get(this.whereToEatUrl + 'user', {params, observe: 'response'});
  }

  public updateUser(user: User) {
    return this.http.put(this.whereToEatUrl + 'updateUser', user, {observe: 'response'});
  }

  public updateUserSubmission(userId: number, submissionId: number) {
    const params: HttpParams = new HttpParams().set('userId', userId).set('submissionId', submissionId);
    return this.http.post(this.whereToEatUrl + 'addUserSubmission', params, {observe: 'response'});
  }
}
