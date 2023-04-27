import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDateOfDay(): Date {
    return new Date();
  }

  getLastsDatesFromToday(numberOfDays: number): Array<Date> {
    return Array.from(Array(numberOfDays).keys()).map(
      day => new Date(this.getDateOfDay().setDate(this.getDateOfDay().getDate() - day))
    );
  }
}
