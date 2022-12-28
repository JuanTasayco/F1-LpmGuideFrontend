import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyVal'
})
export class KeyValuesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string[] {
    const arrayValues: any = value; /* quitando el unknow del pipe keyvalue */
    /* arrayValues son los values de otro objeto en uso  */
    const newKeysOfArrayValues: any = [];

    for (let i of arrayValues) { /* necesito recorrer esos values, y obtener las keys de esos objetos */
      newKeysOfArrayValues.push(Object.keys(i))
    }
   

    return newKeysOfArrayValues.flat();
  }

}
