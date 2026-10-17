import { Pipe, PipeTransform } from '@angular/core';

/** Formats a timestamp as Philippine time, e.g. "4:12:05 PM". Pure: the
    caller passes a new timestamp to get a new string. */
@Pipe({
  name: 'localTime',
  standalone: true,
})
export class LocalTimePipe implements PipeTransform {
  transform(ms: number): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila'
    }).format(new Date(ms));
  }
}