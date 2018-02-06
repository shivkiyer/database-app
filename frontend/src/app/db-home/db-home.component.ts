import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ServerConfigurationService } from './../shared/services/server-config.service';
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

  constructor(private router: Router,
              private serverConfig: ServerConfigurationService,
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

  onSubmit() {
    this.tableChosen = this.dbTables[this.chooseTableForm.value.table];
    this.dbMethodsService.getTableContents(this.dbTables[this.chooseTableForm.value.table])
          .subscribe(
            (response) => {
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
                      rowContents.push(row[colPrefix][subItem]);
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
              this.displayTable = true;
            },
            (errors) => {
              console.log(errors);
            }
          );
  }

}
