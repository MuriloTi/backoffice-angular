import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Constants from '../utilities/Constants';

@Injectable({
  providedIn: 'root'
})
export class ViaCEPService {

  constructor(private http: HttpClient) { }

  get(cep: any): Observable<any>{
    return this.http.get(Constants.API_GET_CEP + cep + '/json');
  }
}
