import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  private _apiEndpoint: string = 'https://localhost:8080/Category';

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this._apiEndpoint + '/GetAll');
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(
      this._apiEndpoint + '/GetById/' + id.toString()
    );
  }
}
