import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DBMethodsService } from './../shared/services/db-methods.service';

@Component({
  selector: 'app-db-home',
  templateUrl: './db-home.component.html',
  styleUrls: ['./db-home.component.css']
})
export class DbHomeComponent implements OnInit {

  dbName: string;
  dbTables = [];
  dbReady = false;
  chooseTableForm: FormGroup;
  displayTable = false;
  tableContents: any;
  tableOrder: any;
  tableChosen: any;
  tableRowCount: number;
  colStartIndex: number;
  colSelection = [];
  canShiftColLeft: boolean = false;
  canShiftColRight: boolean = false;
  colLimit: number = 5;
  canGetNextRows: boolean = false;
  canGetPrevRows: boolean = false;
  rowStartIndex: number;
  rowEndIndex: number;
  rowSelection = [];
  rowLimit: number = 100;

  constructor(private router: Router,
              private dbMethodsService: DBMethodsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.dbMethodsService.dbIndex < 0) {
      this.router.navigate(['/']);
    } else {
      this.chooseTableForm = new FormGroup({
        table: new FormControl(0, Validators.required)
      });
      this.dbMethodsService.getDBTableList().subscribe(
        (response) => {
          this.dbName = response.dbName;
          this.dbTables = response.dbTables;
          this.dbMethodsService.dbName = this.dbName;
          this.dbMethodsService.dbTables = this.dbTables;
        },
        (errors) => {
          console.log(errors);
        }
      );
      this.dbReady = true;
    }
  }

  getTableContents(table, offset, rowLimit) {
    this.dbMethodsService.getTableContents(table, offset, rowLimit)
          .subscribe(
            (response) => {
              this.tableRowCount = response['count'];
              this.tableOrder = [];
              this.tableContents = [];
              response['result'].forEach((row, rowIndex) => {
                let rowContents = [];
                response['order'].forEach((item) => {
                  let colItem = item;
                  if (!(typeof colItem === 'string')) {
                    let colPrefix = Object.keys(colItem)[0];
                    colItem[colPrefix].forEach((subItem) => {
                      if (rowIndex === 0) {
                        this.tableOrder.push(colPrefix + '.' + subItem);
                      }
                      if (row[colPrefix] !== undefined && row[colPrefix] !== null) {
                        rowContents.push(row[colPrefix][subItem]);
                      }
                    });
                  } else {
                    if (rowIndex === 0) {
                      this.tableOrder.push(item);
                    }
                    rowContents.push(row[item]);
                  }
                });
                this.tableContents.push(rowContents);
              });
              this.colSelection = [];
              for (let iIndex=this.colStartIndex; iIndex<this.colStartIndex+this.colLimit; iIndex++) {
                if (iIndex < this.tableOrder.length) {
                  this.colSelection.push(iIndex);
                }
              }
              if (this.colStartIndex > 0) {
                this.canShiftColLeft = true;
              } else {
                this.canShiftColLeft = false;
              }
              if (this.tableOrder.length > this.colLimit) {
                this.canShiftColRight = true;
              } else {
                this.canShiftColRight = false;
              }
              this.rowSelection = [];
              if (this.tableRowCount < this.rowStartIndex+this.rowLimit) {
                this.rowEndIndex = this.tableRowCount;
              } else {
                this.rowEndIndex = this.rowStartIndex+this.rowLimit;
              }
              for (let iIndex=this.rowStartIndex;iIndex<this.rowEndIndex; iIndex++) {
                if (iIndex < this.tableContents.length) {
                  this.rowSelection.push(iIndex);
                }
              }
              if (this.rowStartIndex + this.rowLimit < this.tableRowCount) {
                this.canGetNextRows = true;
              } else {
                this.canGetNextRows = false;
              }
              if (this.rowStartIndex >= this.rowLimit) {
                this.canGetPrevRows = true;
              } else {
                this.canGetPrevRows = false;
              }
              this.displayTable = true;
            },
            (errors) => {
              console.log(errors);
            }
          );
  }

  onSubmit() {
    this.tableChosen = this.dbTables[this.chooseTableForm.value.table];
    this.displayTable = false;
    this.colStartIndex = 0;
    this.rowStartIndex = 0;
    this.getTableContents(this.dbTables[this.chooseTableForm.value.table], 0, this.rowLimit);
  }

  colShiftLeft() {
    if (this.colStartIndex > 0) {
      this.colStartIndex -= 1;
      this.colSelection.splice(0, 0, this.colStartIndex);
      this.colSelection.pop();
      this.canShiftColRight = true;
    }
    if (this.colStartIndex === 0) {
      this.canShiftColLeft = false;
    }
  }

  colShiftRight() {
    if (this.colStartIndex < this.tableOrder.length - this.colLimit) {
      this.colStartIndex += 1;
      this.colSelection.splice(0, 1);
      this.colSelection.push(this.colStartIndex + this.colLimit - 1);
      this.canShiftColLeft = true;
    }
    if (this.colStartIndex === this.tableOrder.length - this.colLimit) {
      this.canShiftColRight = false;
    }
  }

  rowGetPrev() {
    if (this.rowStartIndex >= this.rowLimit) {
      this.rowStartIndex -= this.rowLimit;
      if (this.tableRowCount < this.rowStartIndex+this.rowLimit) {
        this.rowEndIndex = this.tableRowCount;
      } else {
        this.rowEndIndex = this.rowStartIndex+this.rowLimit;
      }
      this.rowSelection = [];
      for (let iIndex=this.rowStartIndex; iIndex<this.rowEndIndex; iIndex++) {
        this.rowSelection.push(iIndex);
      }
      this.canGetNextRows = true;
      this.getTableContents(this.dbTables[this.chooseTableForm.value.table], this.rowStartIndex, this.rowLimit);
    }
    if (this.rowStartIndex === 0) {
      this.canGetPrevRows = false;
    }
  }

  rowGetNext() {
    if (this.rowStartIndex < this.tableRowCount - this.rowLimit) {
      this.rowStartIndex += this.rowLimit;
      if (this.tableRowCount < this.rowStartIndex+this.rowLimit) {
        this.rowEndIndex = this.tableRowCount;
      } else {
        this.rowEndIndex = this.rowStartIndex+this.rowLimit;
      }
      this.rowSelection = [];
      for (let iIndex=this.rowStartIndex; iIndex<this.rowEndIndex; iIndex++) {
        this.rowSelection.push(iIndex);
      }
      this.canGetPrevRows = true;
      this.getTableContents(this.dbTables[this.chooseTableForm.value.table], this.rowStartIndex, this.rowLimit);
    }
    if (this.rowStartIndex < this.tableRowCount - this.rowLimit) {
      this.canGetNextRows = false;
    }
  }

}
