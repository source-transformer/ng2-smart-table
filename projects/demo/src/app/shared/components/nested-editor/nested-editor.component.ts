import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';
import { DataSource } from 'projects/ng2-smart-table/src/lib/lib/data-source/data-source';
import { Grid } from 'projects/ng2-smart-table/src/lib/lib/grid';
import { Ng2SmartTableComponent } from 'projects/ng2-smart-table/src/lib/ng2-smart-table.component';

@Component({
  template: `
  <div class="table-component" [style.width.px]="tableWidth">
    <ng2-smart-table #smartTable [settings]="settings" [source]="data"
      (edit)="tableEdit($event)"></ng2-smart-table>
  </div>
`,
})

// (edit)="edit.emit($event)"

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

// export class NestedEditorComponent extends DefaultEditor implements AfterViewInit {
export class NestedEditorComponent extends DefaultEditor implements OnInit {

  // @ViewChild('name', { static: false }) name: ElementRef;
  // @ViewChild('htmlValue', { static: false }) htmlValue: ElementRef;


  // @ViewChild('smartTable', { static: false }) smartTable: ElementRef;
  // @ViewChild('smartTable', { static: false }) smartTable: Grid;
  @ViewChild('smartTable', { static: false }) smartTable: Ng2SmartTableComponent;

  data: LocalDataSource;
  settings: any;

  tableWidth = 400;

  constructor(private cd: ChangeDetectorRef) {
    super();

    // console.log('NestedEditorComponent.constructor: this.cell.getValue():', this.cell.getValue());
    // console.log('NestedEditorComponent.constructor: cd:',cd);
    console.log('NestedEditorComponent.constructor: columns:', this.columns);

    // this.data = new LocalDataSource([{id: 'foo'}, {id: 'bar'}]);
  }

  // data: Object - row data object
  // source: DataSource - table data source
  tableEdit(data: object, source: DataSource) {
    console.log('NestedEditorComponent.tableEdit: data:', data, 'source:', source);

    console.log('NestedEditorComponent.tableEdit: this.smartTable:', this.smartTable);

    // this.smartTable.edit(data);
    for (const property in this.smartTable) {
      console.log('NestedEditorComponent.tableEdit: property:', property);
    }

    /*const smartTableObj: any = this.smartTable as Ng2SmartTableComponent;
    smartTableObj.edit(data);
    */
    // this.smartTable.edit.emit(data);

  }

  pascalCase(s: string) {
    s = s.replace(/(\w)(\w*)/g,
        function(g0, g1, g2) {return g1.toUpperCase() + g2.toLowerCase(); });
    return s;
  }

  iterateOverAllRows(tableRows) {
    let computedTableWidth = 400; // default to something more than zero

    if (!tableRows) {
      throw new Error('NestedEditorComponent.iterateOverAllRows: invalid/null table rows handed to nested table component');
    } else if (!Array.isArray(tableRows)) {
      throw new Error('NestedEditorComponent.iterateOverAllRows: table rows handed to nested table component is not an array!');
    } else { // if ((tableRows) && (Array.isArray(tableRows))) {
      // we can probably determine the size of our font dynamically instead of hard-coding it to 0.875
      // also no idea if 14 or 16 is a better increment for px
      // const fontSize = 0.875; // font-size: 0.875em;
      const pxIncrement = 16;
      // const pxRowWidths = [];
      let pxMaxRowWidth = 0;
      // the following loop is being used for two things:
      // 1. set the "schema" (AKA columns) on our ng2-smart-table
      // 2. take a guess on how wide to set the div containing the nested table
      for (let i = 0; i < tableRows.length; ++i) {
        const obj = tableRows[i];

        // There is a "Update Cancel " string in the first column we need to calculate - so not using starting value of zero
        let currentRowWidth = pxIncrement * 'Update Cancel '.length;
        for (const prop in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
              continue;
            }
            if (prop == null) { // don't know if this is possible
              continue;
            }
            // this.settings.columns[prop] = {title:  this.pascalCase(prop), width: '1000px' };
            this.settings.columns[prop] = {title:  this.pascalCase(prop) };

            let columnHeaderWidth = 0;
            let valueRowWidth = 0;

            columnHeaderWidth = prop.length * pxIncrement;
            let maxLength = columnHeaderWidth;

            const valueRowObj = obj[prop];
            if (valueRowObj != null) {
              const valueRowText = valueRowObj.toString();
              valueRowWidth = valueRowText.length * pxIncrement;

              maxLength = Math.max(columnHeaderWidth, valueRowWidth);
            }

            // pxRowWidths.push(maxLength);
            currentRowWidth += maxLength;

            console.log('maxLength:', maxLength, 'columnHeaderWidth:', columnHeaderWidth, 'valueRowWidth:', valueRowWidth);
        }

        if (currentRowWidth > pxMaxRowWidth) {
          pxMaxRowWidth = currentRowWidth;
        }
      }

      console.log('NestedEditorComponent.ngOnInit: computedTableWidth:', computedTableWidth, 'pxMaxRowWidth:', pxMaxRowWidth);

      computedTableWidth = Math.max(computedTableWidth, pxMaxRowWidth);
    }

    // just testing
    // computedTableWidth = 1000;

    this.tableWidth = computedTableWidth;
  }

  // ngAfterViewInit() {
  ngOnInit() {

    console.log('NestedEditorComponent.ngOnInit: this.cell:', this.cell);

    // if (this.cell.newValue !== '') {
      // this.name.nativeElement.value = this.getValue();
    // }

    const value = this.getValue();
    if (!value) {
      console.log('NestedEditorComponent.ngOnInit: no value - early out');
      return;
    }
    // this.settings = {columns: {id: {title: 'ID', width: '*'}}, hideHeader: true, hideSubHeader: true};
    // we can hide the "other top row" using [hideSubHeader: true] - but we'd lose the add button
    // we can use [mode:'external' ] as a way to trigger custom actions example for edit we should trigger: grid.edit(this.row);
    // this.settings = {columns: {}, hideHeader: true, mode: 'external' };
    this.settings = {
      columns: {},
      hideHeader: true,
      attr: {
          class: 'smarty-table',
        },
    };

    if (this.columns) {
      this.settings.columns = this.columns;
    }

    // we call this function for two reasons:
    // 1. set the "schema" (AKA columns) on our ng2-smart-table
    // 2. take a guess on how wide to set the div containing the nested table
    this.iterateOverAllRows(value);

    // this.data = this.getValue();
    this.data = new LocalDataSource(value);

    console.log('NestedEditorComponent.ngOnInit: (typeof this.data):', typeof(this.data), 'Array.isArray:', Array.isArray(this.data));

    console.log('NestedEditorComponent.ngOnInit: this.data:', this.data);
  }
/*
  updateValue() {
    // const value = this.name.nativeElement.value;
    console.log('NestedEditorComponent.updateValue: this.data:', this.data);
    // this.cell.newValue = this.data;
  }
*/

getValue(): any {

    const cellValue = this.cell.getValue();
    // console.log('getValue: this.htmlValue.nativeElement:', this.htmlValue.nativeElement);
    console.log('NestedEditorComponent.getValue: this.cell.getValue():', cellValue);
    // return this.htmlValue.nativeElement.innerText;
    return cellValue;
  }

}
