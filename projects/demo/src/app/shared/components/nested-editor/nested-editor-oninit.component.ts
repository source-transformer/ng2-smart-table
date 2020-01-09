import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';

@Component({
  template: `
  <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
`,
})

/*
`
    <input [ngClass]="inputClass"
            #name
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getTitle()"
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()"><br>

            <div [hidden]="true" #htmlValue>{{cell.getValue()}}</div>
  `
*/

// <div [hidden]="true" #htmlValue>{{getValue()}}</div>
// <div [hidden]="true" #htmlValue>{{cell.getValue()}}</div>
// <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
// <div [hidden]="true" [innerHTML]="{{cell.getValue()}}" #htmlValue></div>
// {{cell.getValue()}}

// export class NestedEditorOnInitComponent extends DefaultEditor implements AfterViewInit {
export class NestedEditorOnInitComponent extends DefaultEditor implements OnInit {

  // @ViewChild('name', { static: false }) name: ElementRef;
  // @ViewChild('htmlValue', { static: false }) htmlValue: ElementRef;

  data: any;
  settings: any;

  constructor() {
    super();

    // console.log('NestedEditorOnInitComponent.constructor: this.cell.getValue():', this.cell.getValue());
  }

  // ngAfterViewInit() {

  ngOnInit() {

    console.log('NestedEditorOnInitComponent.ngOnInit: this.cell:', this.cell);

    // if (this.cell.newValue !== '') {
      // this.name.nativeElement.value = this.getValue();
    // }

    // this.data = this.getValue();
    this.data = new LocalDataSource(this.getValue());

    console.log('NestedEditorOnInitComponent.ngOnInit: (typeof this.data):', typeof(this.data), 'Array.isArray:', Array.isArray(this.data));

    console.log('NestedEditorOnInitComponent.ngOnInit: this.data:', this.data);

    this.settings = {columns: {id: {title: 'ID'}}};
  }
/*
  updateValue() {
    // const value = this.name.nativeElement.value;
    console.log('NestedEditorOnInitComponent.updateValue: this.data:', this.data);
    // this.cell.newValue = this.data;
  }
*/

  getValue(): any {

    // console.log('getValue: this.htmlValue.nativeElement:', this.htmlValue.nativeElement);
    console.log('NestedEditorOnInitComponent.getValue: this.cell.getValue():', this.cell.getValue());
    // return this.htmlValue.nativeElement.innerText;
    return this.cell.getValue();
  }

}
