import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { ServerConfigurationService } from './../shared/services/server-config.service';
import { DBMethodsService } from './../shared/services/db-methods.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  dbError = false;
  dbErrorMessage = '';
  dbList = [];
  chooseDB: FormGroup;

  constructor(private http: Http,
              private serverConfig: ServerConfigurationService,
              private dbMethodsService: DBMethodsService,
              private router: Router) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    this.chooseDB = new FormGroup({
      'db': new FormControl(0, Validators.required)
    });

    this.http.get(this.serverConfig.baseApi.value).subscribe(
      (response) => {
        this.dbList = response.json();
        this.dbMethodsService.dbRefreshList(this.dbList);
      },
      (errors) => {
        this.dbError = true;
        this.dbErrorMessage = errors.json().message;
      }
    );
  }

  onSubmit() {
    this.dbMethodsService.dbInit(this.chooseDB.value.db);
    this.router.navigate(['/db']);
  }

}
