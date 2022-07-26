import { Directive, ElementRef, Input, OnInit } from "@angular/core";


@Directive({
	selector: '[taskStatus]'
})
export class TaskStatusDirective implements OnInit {
    
    statusColors: string[] = ['#0094ff', '#ffb000', '#00B076'];

    @Input() taskStatus: number;
    
    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {       
        this.elementRef.nativeElement.style.borderLeft = `5px solid ${this.statusColors[this.taskStatus -1]}`;
    }
}