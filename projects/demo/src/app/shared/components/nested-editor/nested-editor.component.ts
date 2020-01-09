import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DefaultEditor, LocalDataSource } from 'ng2-smart-table';

@Component( {
	template: `
  <div class="table-component" [style.width.px]="tableWidth">
    <ng2-smart-table #smartTable [settings]="settings" [source]="data"></ng2-smart-table>
  </div>
`,
} )

export class NestedEditorComponent extends DefaultEditor implements OnInit {

	data!: LocalDataSource;
	settings: any;

	tableWidth = 400;

  constructor(private cd: ChangeDetectorRef) {
    super();

    // console.log('NestedEditorComponent.constructor: this.cell.getValue():', this.cell.getValue());
    // console.log('NestedEditorComponent.constructor: cd:',cd);
    // console.log('NestedEditorComponent.constructor: columns:', this.columns);
	  // console.log('NestedEditorComponent.constructor: data:',data);
  }

	pascalCase( s: string ) {
		s = s.replace( /(\w)(\w*)/g,
				function( g0, g1, g2 ) {return g1.toUpperCase() + g2.toLowerCase(); } );
		return s;
	}

	iterateOverAllRows( tableRows: any ) {
		let computedTableWidth = 400; // default to something more than zero
		const defaultHeaderId = 'id';

		if ( !tableRows ) {
			throw new Error( 'NestedEditorComponent.iterateOverAllRows: invalid/null table rows handed to nested table component' );
		} else if ( !Array.isArray( tableRows ) ) {
			throw new Error( 'NestedEditorComponent.iterateOverAllRows: table rows handed to nested table component is not an array!' );
		} else { // if ((tableRows) && (Array.isArray(tableRows))) {
			// console.log( 'iterateOverAllRows: tableRows:', tableRows );
			// we can probably determine the size of our font dynamically instead of hard-coding it to 0.875
			// also no idea if 14 or 16 is a better increment for px
			// const fontSize = 0.875; // font-size: 0.875em;
			const pxIncrement = 16;
			// const pxRowWidths = [];
			let pxMaxRowWidth = 0;
			// the following loop is being used for two things:
			// 1. set the "schema" (AKA columns) on our ng2-smart-table
			// 2. take a guess on how wide to set the div containing the nested table
			for ( let i = 0; i < tableRows.length; ++i ) {
				const obj = tableRows[i];

				// There is a "Update Cancel " string in the first column we need to calculate - so not using starting value of zero
				let currentRowWidth = pxIncrement * 'Update Cancel '.length;
				if ( typeof obj === 'string' ) {
					/*this.settings.columns[defaultHeaderId] = {title:  this.pascalCase( defaultHeaderId ) };
					currentRowWidth += obj.length * pxIncrement;
					*/
					throw new Error( 'NestedEditorComponent.iterateOverAllRows: unable to handle strings as elements of an array' );
				} else {
					for ( const prop in obj ) {
						if ( !Object.prototype.hasOwnProperty.call( obj, prop ) ) {
							continue;
						}
						if ( prop == null ) { // don't know if this is possible
							continue;
						}

						const columnObj: any = {title:  this.pascalCase( prop ) };
						this.settings.columns[prop] = columnObj;

						let columnHeaderWidth = 0;
						let valueRowWidth = 0;

						columnHeaderWidth = prop.length * pxIncrement;
						let maxLength = columnHeaderWidth;

						const valueRowObj = obj[prop];
						if ( valueRowObj != null ) {
							const valueRowText = valueRowObj.toString();
							valueRowWidth = valueRowText.length * pxIncrement;

							maxLength = Math.max( columnHeaderWidth, valueRowWidth );

							if ( typeof valueRowObj === 'object' ) {
								columnObj.valuePrepareFunction = function( data: any ) {
									// return data.name;
									return JSON.stringify( data );
								};
								// TPC: TODO: we don't have a good/general solution for editting objects - so for the time being - don't allow editting (also the stupid smart-table just displays "[object Object]")
								columnObj.editable = false;
							}
						}
						currentRowWidth += maxLength;
						// console.log( 'maxLength:', maxLength, 'columnHeaderWidth:', columnHeaderWidth, 'valueRowWidth:', valueRowWidth );
					}
				}

				if ( currentRowWidth > pxMaxRowWidth ) {
					pxMaxRowWidth = currentRowWidth;
				}
			}

			// console.log( 'NestedEditorComponent.ngOnInit: computedTableWidth:', computedTableWidth, 'pxMaxRowWidth:', pxMaxRowWidth );
			computedTableWidth = Math.max( computedTableWidth, pxMaxRowWidth );
		}

		// just testing
		// computedTableWidth = 1000;

		this.tableWidth = computedTableWidth;
	}

	ngOnInit() {
		const value = this.getValue();

		// console.log( 'NestedEditorComponent.ngOnInit: value:', value, 'this.cell:', this.cell );

		if ( !value ) {
			console.log( 'NestedEditorComponent.ngOnInit: no value - early out' );
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
		this.iterateOverAllRows( value );

		this.data = new LocalDataSource( value );
		// console.log( 'NestedEditorComponent.ngOnInit: (typeof this.data):', typeof( this.data ), 'Array.isArray:', Array.isArray( this.data ) );
		// console.log( 'NestedEditorComponent.ngOnInit: this.data:', this.data );
	}

	getValue(): any {
		const cellValue = this.cell.getValue();
		// console.log('getValue: this.htmlValue.nativeElement:', this.htmlValue.nativeElement);
		// console.log( 'NestedEditorComponent.getValue: this.cell.getValue():', cellValue );
		return cellValue;
	}

}
