import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http:HttpClient) { }
    private _apiEndpoint: string = 'https://localhost:8080/Auth';
    private _options: any = {
      observe: 'response',
      responseType: 'text',

    };

    public postImage(imgAsBase64:any):Observable<HttpEvent<string>>{
      const formData = new FormData();
      formData.append('file', imgAsBase64, imgAsBase64.name);

      return this.http.post<string>(
        this._apiEndpoint +'/Test',
        formData,
        this._options
      )
    }

}
