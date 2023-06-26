import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowRequestService {
  private _apiEndpoint: string = 'https://localhost:8080/Request';

  constructor(private readonly http: HttpClient) {
  }

  public getUnavailableDaysForAnnouncement(id:number):Observable<Date[]>{
    return this.http.get<Date[]>(this._apiEndpoint+`/GetBusyDaysForAnnouncement/${id}`);
  }

}
