import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ServerConfigurationService } from './server-config.service';

@Injectable()
export class DBMethodsService {
  dbIndex = -1;
  dbName: string;
  dbList = [];
  dbTables = [];

  constructor(private http: Http,
              private serverConfig: ServerConfigurationService) {}

  dbInit(index: number) {
    this.dbIndex = index;
  }

  dbRefreshList(db: any) {
    this.dbList = db;
  }

  getDBTableList(): Observable<any> {
    return this.http.get(this.serverConfig.baseApi.value + '/db/' + this.dbIndex)
        .map(response => response.json());
  }
}
