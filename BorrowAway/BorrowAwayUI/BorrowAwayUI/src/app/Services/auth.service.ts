import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  private _apiEndpoint:string = "https://localhost:8080/Auth/";


  public testGet():Observable<any>{
    return this.http.get(this._apiEndpoint+'Test');
  }
}
