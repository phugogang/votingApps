import {Directive, HostListener, Renderer2, ElementRef} from '@angular/core';

@Directive({
    selector: '[Mousehover]'
})

export class MouseHoverDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') mouseenter() {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
        this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid green');       
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '3px 3px 2px #888888');
         this.renderer.setStyle(this.el.nativeElement, 'font-weight', '800');
        this.renderer.addClass(this.el.nativeElement, 'active')
    }

    @HostListener('mouseleave') mouseleve() {      
        
         this.renderer.removeClass(this.el.nativeElement, 'active');
         this.renderer.removeStyle(this.el.nativeElement, 'border');
         this.renderer.removeStyle(this.el.nativeElement, 'transform');
         this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
    }


}