import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonData } from '../Models/button-data';
import { AnnouncementService } from '../Services/announcement.service';
import { AuthService } from '../Services/auth.service';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
})
export class AnnouncementsPageComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _announcementService: AnnouncementService,
    private _categoryService: CategoryService
  ) {}

  buttonsData: ButtonData[] = [
    {
      buttonText: 'Home',
      redirectUrl: 'home',
      iconName: 'home',
    },
    {
      buttonText: 'Profile',
      redirectUrl: 'editProfile',
      iconName: 'account_circle',
    },
    {
      buttonText: 'Log Out',
      redirectUrl: '',
      iconName: 'logout',
    },
  ];

  public buttonClickedEventReceived(redirectUrl: string) {
    if (redirectUrl == '') {
      this._authService.logoutUser().subscribe({
        next: (response: any) => {
          localStorage.clear();
          this._router.navigateByUrl('');
          return;
        },
        error: (err) => {
          localStorage.clear();
          this._router.navigateByUrl;
          return;
        },
      });
    } else if (redirectUrl == 'listItem') {
      this._router.navigateByUrl(redirectUrl);
      return;
    } else if (redirectUrl == 'editProfile') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
