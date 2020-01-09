import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  template: `
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
`,
})

/*
*/

// <div [hidden]="true" #htmlValue>{{getValue()}}</div>
// <div [hidden]="true" #htmlValue>{{cell.getValue()}}</div>
// <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
// <div [hidden]="true" [innerHTML]="{{cell.getValue()}}" #htmlValue></div>
// {{cell.getValue()}}

export class RawEditorComponent extends DefaultEditor implements AfterViewInit {
// export class RawEditorComponent extends DefaultEditor implements OnInit {

  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('htmlValue', { static: false }) htmlValue: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {

    console.log('ngAfterViewInit: this.cell:', this.cell);

    if (this.cell.newValue !== '') {
       this.name.nativeElement.value = this.getValue();
     }
  }

  updateValue() {
    const value = this.name.nativeElement.value;
    console.log('updateValue: value:', value);
    // this.cell.newValue = `<a href='${href}'>${name}</a>`;
    //this.cell.newValue = value;
    this.cell.newValue = JSON.parse(value);
  }

  getValue(): string {

    // console.log('getValue: this.htmlValue.nativeElement:', this.htmlValue.nativeElement);
    const cellValue = this.cell.getValue();
    console.log('getValue: this.cell.getValue():', cellValue);
    // return this.htmlValue.nativeElement.innerText;

    return JSON.stringify(cellValue);
  }

}
