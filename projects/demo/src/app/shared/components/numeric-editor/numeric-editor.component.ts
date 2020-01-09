import { Component, OnInit } from '@angular/core';
import { DefaultEditor} from 'ng2-smart-table';

@Component( {
	selector: 'input-number-view',
	template: `
	<input
		type="number"
		[ngClass]="inputClass"
		class="form-control"
		[(ngModel)]="cell.newValue"
		[name]="cell.getId()"
		[placeholder]="cell.getTitle()"
		[disabled]="!cell.isEditable()"
		(click)="onClick.emit($event)"
		(keydown.enter)="onEdited.emit($event)"
		(keydown.esc)="onStopEditing.emit()"
	>
    `,
} )

export class NumericComponentDynamic extends DefaultEditor implements OnInit {

	ngOnInit() {
		// console.log( 'this.cell.newValue:', this.cell.newValue, 'this.cell.getValue():', this.cell.getValue() );
	}
}
