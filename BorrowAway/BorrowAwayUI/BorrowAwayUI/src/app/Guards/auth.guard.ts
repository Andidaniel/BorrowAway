import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuardService{
  constructor(private _authService:AuthService, private _router:Router){}
  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    if( this._authService.isUserLoggedIn() ==true)
    {
      return true;
    }
    localStorage.clear();
    this._router.navigate(['']);
    return false;
  }
  canActivateLogin(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    if( this._authService.isUserLoggedIn() ==true)
    {
      this._router.navigateByUrl('/requests');
      return true;
    }
    return false;
  }
}
export const AuthGuard: CanActivateFn = (
  next:ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):boolean=>{
  return inject(AuthGuardService).canActivate(next,state);
}



export const LoginPageGuard: CanActivateFn = (
  next:ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):boolean=>{
  return !inject(AuthGuardService).canActivateLogin(next,state);
}


