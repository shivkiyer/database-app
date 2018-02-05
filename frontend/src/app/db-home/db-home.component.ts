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
    console.log(this.dbTables[this.chooseTableForm.value.table]);
    this.dbMethodsService.getTableContents(this.dbTables[this.chooseTableForm.value.table])
          .subscribe(
            (response) => {
              console.log(response);
            },
            (errors) => {
              console.log(errors);
            }
          );
  }

}
