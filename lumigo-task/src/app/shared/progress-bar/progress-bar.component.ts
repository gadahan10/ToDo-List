import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskService } from 'src/app/components/tasks/services/tasks.service';

@Component({
	selector: 'progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements  OnChanges {
	
	totalRatio: any = [];
	@Input() inProgress: number = 0;
	@Input() pending:number = 0;
	@Input() completed: number = 0;
	totalTasks: number = 0;

	constructor() { }	

	ngOnChanges(changes: SimpleChanges): void {		
		console.log('ProgressBarComponent')
		this.updateTotal();
	}

	private updateTotal(): void {
		this.totalTasks = this.inProgress + this.pending + this.completed;
		if (this.totalTasks == 0) {
			this.totalTasks = 1;
		}
	}
	

}
