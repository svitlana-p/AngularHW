import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(private elem: ElementRef) { }

  ngAfterViewInit(): void {
    this.elem.nativeElement.focus()
  }

}
