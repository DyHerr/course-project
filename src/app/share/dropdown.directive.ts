import { Directive, HostBinding, HostListener,ElementRef } from "@angular/core";
@Directive({
    selector: '[appDropdown]'
})

export class DropwdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ?
        !this.isOpen : false; 
    }

    constructor(private elRef: ElementRef){
        
    }

    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // }
}