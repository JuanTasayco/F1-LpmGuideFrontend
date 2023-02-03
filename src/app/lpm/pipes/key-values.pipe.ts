import { Pipe, PipeTransform } from '@angular/core';

export interface SectionValues {
  id: string,
  section: string,
  title: string,
  title2?: string
}

@Pipe({
  name: 'keyVal'
})
export class KeyValuesPipe implements PipeTransform {

  transform(value: unknown): SectionValues[] {
    const a: any = value; /* quitando el unknow del pipe keyvalue */
    let arrayValues: SectionValues[] = a
    return arrayValues;
  }

}
