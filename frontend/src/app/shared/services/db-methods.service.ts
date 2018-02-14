import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// import { ServerConfigurationService } from './server-config.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class DBMethodsService {
  dbIndex = -1;
  dbName: string;
  dbList = [];
  dbTables = [];

  constructor(private http: Http) {}

  dbInit(index: number) {
    this.dbIndex = index;
  }

  dbRefreshList(db: any) {
    this.dbList = db;
  }

  getDBTableList(): Observable<any> {
    return this.http.get(environment.baseApi.value + '/api/' + this.dbIndex)
        .map(response => response.json());
  }

  getTableContents(tableName: string, offset: number, limit: number): Observable<any> {
    return this.http.get(environment.baseApi.value + '/api/' + this.dbIndex + '/' + tableName + '/'+ offset + '/' + limit)
        .map(response => response.json());
  }
}
