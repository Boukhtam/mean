import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _htttp: HttpClient) { }

  loadData(query: any) {
    return this._htttp.get(`/api/data`, {
      params: query      
    }).pipe(map(res => res))
  }
}
