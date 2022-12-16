import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShowPassword]',
  exportAs: 'appShowPassword'
})
export class ShowPasswordDirective {
  isVisible:boolean = false;

  constructor(private el: ElementRef) {
  }

  toggleVisibility():void {
    this.isVisible = !this.isVisible;
    this.el.nativeElement.type = this.isVisible ? 'text' : 'password';
  }
}
