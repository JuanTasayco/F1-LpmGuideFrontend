import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusUser',
})
export class StatusUserPipe implements PipeTransform {
  transform(value: boolean = false): string {
    if (value == true) {
      return 'activo';
    } else {
      return 'inactivo';
    }
  }
}
