import { animate, state, style, transition, trigger } from "@angular/animations";

export const showHideList = trigger('showHideList', [	
	state('false', style({  minHeight: '2rem', overflowY: 'auto' })),
	state('true', style({ height: 0, overflowY: 'hidden', minHeight: 0 })),
	transition('* <=> *', animate('400ms ease-out'))
]);