import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Constants from '../utilities/Constants';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(Constants.API_GET_ALL_DEPARTAMENTOS);
  }

  post(data : any): Observable<any>{
    return this.http.post(Constants.API_CREATE_DEPARTAMENTO, data);
  }

  update(id: any, data: any): Observable<any>{
    return this.http.put(Constants.API_UPDATE_DEPARTAMENTO + id, data);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(Constants.API_DELETE_DEPARTAMENTO + id);
  }
}
