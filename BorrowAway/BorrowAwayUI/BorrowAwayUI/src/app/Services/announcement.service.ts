import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(private http: HttpClient) {}
  private _apiEndpoint: string = 'https://localhost:8080/Announcement';
  private _options: any = {
    observe: 'response',
    responseType: 'text',
  };

  public postAnnouncement(
    announcement: Announcement
  ): Observable<HttpEvent<string>> {
    return this.http.post<string>(
      this._apiEndpoint + '/Add',
      announcement,
      this._options
    );
  }

  public updateAnnouncement(
    announcemnent: Announcement
  ): Observable<HttpEvent<string>> {
    return this.http.put<string>(
      this._apiEndpoint + '/UpdateAnnouncement',
      announcemnent,
      this._options
    );
  }

  public getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this._apiEndpoint + '/GetAll');
  }

  public getLastSixAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this._apiEndpoint + '/GetLast' + '/6');
  }

  public getAnnouncementById(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(
      this._apiEndpoint + '/GetById' + '/' + id
    );
  }

  public getUserNameById(id: string): Observable<HttpEvent<string>> {
    return this.http.get<string>(
      this._apiEndpoint + '/GetUserName/' + id,
      this._options
    );
  }

  public getAnnouncementByCategoryId(
    categoryId: number
  ): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(
      this._apiEndpoint + '/GetAllByCategoryId/' + categoryId
    );
  }

  public getAnnouncementBySearchPredicate(
    searchPredicate: string
  ): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(
      this._apiEndpoint + `/SearchAnnouncements?searchText=${searchPredicate}`
    );
  }

  public getAllUserAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(
      this._apiEndpoint + '/GetAllByUserEmail'
    );
  }

  public deleteAnnouncement(id: number): Observable<HttpEvent<string>> {
    return this.http.delete<string>(
      this._apiEndpoint + '/DeleteAnnouncement/' + id,
      this._options
    );
  }
}
