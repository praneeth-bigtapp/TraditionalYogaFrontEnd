import { Directive, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Directive({
  selector: '[filter]',
  inputs: ['filter'],
  host: {
    '(keyup)': 'onInput()'
  }
})
export class FilterDirective {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  filter: any;

  constructor(public el: ElementRef, public renderer: Renderer2) { }

  onInput() {
    var tempGridData = [];
    tempGridData = this.filter.gridData;
    for (let colName of this.filter.filterColumnNames) {
      tempGridData = tempGridData.filter(
        (x: { [x: string]: any; }) => (!!colName.Value ?
          (!!x[colName.Key] ? x[colName.Key] : "").toString().toLowerCase().indexOf(colName.Value.toString().trim().toLowerCase()) > -1 : true)
      );
    }
    this.filter.dataSource = new MatTableDataSource(tempGridData);
    this.filter.dataSource.paginator = this.filter.paginator;
    this.filter.dataSource.sort = this.filter.sort;
    if (this.filter.paginator) {
      this.filter.paginator.firstPage();
    }
  }

}