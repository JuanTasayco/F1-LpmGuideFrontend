import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string = ''): unknown {
    if (value) {
      return value;
    } else {
      return 'https://res.cloudinary.com/dndimul42/image/upload/v1681839890/lpm/b9janghwwhy6agr5nj9x.jpg';
    }
  }
}
