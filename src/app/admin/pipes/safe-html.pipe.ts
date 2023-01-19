import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  transform(value: any): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
