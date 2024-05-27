import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {}

  formatDate(dateString: string): { date: string, time: string } {
    const dt = DateTime.fromISO(dateString);
    return {
      date: dt.toFormat('yyyy-MM-dd'),
      time: dt.toFormat('HH:mm:ss')
    };
  }

  formatDateOnly(dateString: string): string {
    const dt = DateTime.fromISO(dateString);
    return dt.toFormat('yyyy-MM-dd');
  }
}
