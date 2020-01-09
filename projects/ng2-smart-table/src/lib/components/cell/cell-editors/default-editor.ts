import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { Column } from '../../../lib/data-set/column';

export class DefaultEditor implements Editor {
  @Input() cell: Cell;
  @Input() inputClass: string;

  @Output() onStopEditing = new EventEmitter<any>();
  @Output() onEdited = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();

  columns = [];
}

export interface Editor {
  cell: Cell;
  inputClass: string;
  onStopEditing: EventEmitter<any>;
  onEdited: EventEmitter<any>;
  onClick: EventEmitter<any>;
  columns: Column[];
}
