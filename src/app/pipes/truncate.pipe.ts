import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, ellipsis = true): string {
    if (!value) return value;

    // If the string is longer than the limit, truncate it
    if (value.length > limit) {
      return value.substring(0, limit) + (ellipsis ? '...' : '');
    }
    return value;
  }
}
