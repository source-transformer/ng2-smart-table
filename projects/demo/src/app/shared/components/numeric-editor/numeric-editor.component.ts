import { Component, OnInit } from '@angular/core';
import { DefaultEditor} from 'ng2-smart-table';

@Component({
  selector: 'input-number-view',
  template: `<input
      type=number
      [(ngModel)]='this.cell.newValue'
      [name]="cell.getId()"
    >
  `,
})

export class NumericComponentDynamic extends DefaultEditor implements OnInit {
  ngOnInit() {
    this.cell.newValue = this.cell.getValue();
  }
}
