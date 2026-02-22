import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localTime',
  standalone: true,
  pure: false
})
export class LocalTimePipe implements PipeTransform {
  transform(value: any): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila'
    }).format(new Date());
  }
}