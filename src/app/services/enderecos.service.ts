import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Constants from '../utilities/Constants';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<any>{
    return this.http.get(Constants.API_GET_ENDERECO_BY_ID + id);
  }

  post(data : any): Observable<any>{
    return this.http.post(Constants.API_CREATE_ENDERECO, data);
  }

  update(id: any, data: any): Observable<any>{
    return this.http.put(Constants.API_UPDATE_ENDERECO + id, data);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(Constants.API_DELETE_ENDERECO + id);
  }

}
