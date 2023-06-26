import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorrowRequestService {
  private _apiEndpoint: string = 'https://localhost:8080/Request';
  private _options: any = {
    observe: 'response',
    responseType: 'text',
  };

  constructor(private readonly http: HttpClient) {}

  public getUnavailableDaysForAnnouncement(id: number): Observable<Date[]> {
    return this.http.get<Date[]>(
      this._apiEndpoint + `/GetBusyDaysForAnnouncement/${id}`
    );
  }

  public postBorrowRequest(
    announcementId: number,
    startDate: Date,
    endDate: Date
  ): Observable<HttpEvent<string>> {
    return this.http.post<string>(
      this._apiEndpoint + '/PostRequest',
      {
        announcementId: announcementId,
        startDate: startDate,
        endDate: endDate,
      },
      this._options
    );
  }

  public getUserBorrowRequests(): Observable<any[]> {
    return this.http.get<any[]>(this._apiEndpoint + `/GetRequestsMadeByUser`);
  }

  public getUserLendOpportunities(): Observable<any[]> {
    return this.http.get<any[]>(this._apiEndpoint + `/GetRequestsForUser`);
  }

  public deleteBorrowRequest(requestId: number): Observable<HttpEvent<string>> {
    return this.http.delete<string>(
      this._apiEndpoint + '/DeleteRequest/' + requestId,
      this._options
    );
  }

  public approveLendOpportunity(
    opportunityId: number
  ): Observable<HttpEvent<string>> {
    return this.http.put<string>(
      this._apiEndpoint + '/ApproveRequest/' + opportunityId,
      {},
      this._options
    );
  }

  public denyLendOpportunity(
    opportunityId: number
  ): Observable<HttpEvent<string>> {
    return this.http.put<string>(
      this._apiEndpoint + '/DenyRequest/' + opportunityId,
      {},
      this._options
    );
  }
}
