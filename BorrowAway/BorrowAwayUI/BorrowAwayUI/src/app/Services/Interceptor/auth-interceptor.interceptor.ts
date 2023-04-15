import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiUm9iZXJ0IC0gR2FicmllbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InJtYXhpbUB0YWxlbnRpbmdzb2Z0d2FyZS5jb20iLCJleHAiOjE2ODE1NjgyMzJ9.sm75kMQLEaIpNigE0_eWTNVCic6dj6RrCyMOTe1S6mzk-ppG312oBHQC1GFK5dWtKm0RPBTbjX8KgtHS-dydYA";
    const cloned = request.clone({
      headers:request.headers.set("Authorization", "Bearer "+ token)
    });

    return next.handle(cloned);


  }
}
