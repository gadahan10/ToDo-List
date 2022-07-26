import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'date-header',
	templateUrl: './date-header.component.html',
	styleUrls: ['./date-header.component.scss']
})
export class DateHeaderComponent implements OnInit {

	// Date
	date: Date = new Date();
	day: string;
	month: string;
	year: string;
	dayOfWeek: string;

	constructor(private _datePipe: DatePipe) { }

	ngOnInit(): void {
		
		this.dayOfWeek = this._datePipe.transform(new Date(), 'EEEE')!;
		this.month = this._datePipe.transform(this.date, 'MMM')!;
		this.day = this._datePipe.transform(new Date(), 'd')!;
		this.year = this._datePipe.transform(this.date, 'y')!;
	}

}
