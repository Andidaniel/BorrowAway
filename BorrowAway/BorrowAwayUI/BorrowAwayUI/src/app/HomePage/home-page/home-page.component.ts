import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonData } from 'src/app/Models/button-data';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private _authService:AuthService,private _router:Router){}
  buttonsData:ButtonData[] = [
    {
      buttonText:"List item",
      redirectUrl:"listItem",
      iconName:"add_circle_outline"
    },
    {
      buttonText:"Profile",
      redirectUrl:"editProfile",
      iconName:"account_circle"
    },
    {
      buttonText:"Log Out",
      redirectUrl:"",
      iconName:"logout"
    }

  ];
  public buttonClickedEventReceived(redirectUrl:string){
    if(redirectUrl==""){
      this._authService.logoutUser().subscribe({
        next:(response:any)=>{
          localStorage.clear();
          this._router.navigateByUrl('');
          return;
        },
        error:err=>{
          localStorage.clear();
          this._router.navigateByUrl;
          return;
        }
      });
    }
    else if(redirectUrl == "listItem"){
      this._router.navigateByUrl(redirectUrl);
    }
    else if(redirectUrl == "editProfile"){
      this._router.navigateByUrl(redirectUrl);
    }

  }


}
