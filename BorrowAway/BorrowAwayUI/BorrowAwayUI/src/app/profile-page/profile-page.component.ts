import { Component } from '@angular/core';
import { ButtonData } from '../Models/button-data';
import { Announcement } from '../Models/announcement';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../Services/announcement.service';
import { AuthService } from '../Services/auth.service';
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  buttonsData: ButtonData[] = [
    {
      buttonText: 'Home',
      redirectUrl: 'home',
      iconName: 'home',
    },
    {
      buttonText: 'List Item',
      redirectUrl: 'listItem',
      iconName: 'add_circle_outline',
    },
    {
      buttonText: 'Log Out',
      redirectUrl: '',
      iconName: 'logout',
    },
  ];

  userName: string = '?';
  userEmail: string = '?';
  userAnnouncements: Announcement[] = [];
  categories: any[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _announcementService: AnnouncementService,
    private readonly _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this._announcementService.getAllUserAnnouncements().subscribe((ann) => {
      this.userAnnouncements = ann;
    });

    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
    });

    const userData = this._authService.getUserData();
    this.userName = userData.name;
    this.userEmail = userData.email;
  }

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
    } else if (redirectUrl == 'home') {
      this._router.navigateByUrl(redirectUrl);
      return;
    } else if (redirectUrl == 'listItem') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
