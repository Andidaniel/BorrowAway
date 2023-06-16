import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../Models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http:HttpClient) { }
    private _apiEndpoint: string = 'https://localhost:8080/Announcement';
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
    public postAnnouncement(announcement:Announcement):Observable<HttpEvent<string>>{
      return this.http.post<string>(
        this._apiEndpoint +'/Add',
        announcement,
        this._options
      )
    }
    public getAllAnnouncements():Observable<Announcement[]>{
      return this.http.get<Announcement[]>(
        this._apiEndpoint+'/GetAll'
      );
    }
    public getLastSixAnnouncements():Observable<Announcement[]>{
      return this.http.get<Announcement[]>(
        this._apiEndpoint+"/GetLast"+"/6"
      );
    }

}
