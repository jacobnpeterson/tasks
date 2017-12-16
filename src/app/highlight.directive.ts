import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.unHighlight();
  }

  private highlight() {
    this.el.nativeElement.style.opacity = '.8';
    this.el.nativeElement.style.boxShadow = '0 4px 16px rgba(0,0,0,.6)';
    this.el.nativeElement.style.cursor = 'pointer';
  }

  private unHighlight(){
    this.el.nativeElement.style.opacity = '1';
    this.el.nativeElement.style.boxShadow = '0 4px 16px rgba(0,0,0,.2)';
  }

}
