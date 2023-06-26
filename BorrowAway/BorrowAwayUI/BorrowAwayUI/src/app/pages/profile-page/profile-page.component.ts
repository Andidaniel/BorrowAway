import { Component } from '@angular/core';
import { ButtonData } from '../../models/button-data';
import { Announcement } from '../../models/announcement';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

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

  onAnnouncementDelete(announcement: Announcement) {
    let index = this.userAnnouncements.indexOf(announcement);
    if (index !== -1) {
      this.userAnnouncements.splice(index, 1);
      this.showDeletedAnnouncementMessage();
    }
  }

  onDeleteError(errorMessage: string) {
    this.showErrorMessage(errorMessage);
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

  // Toast
  public toastMessage: string = ' ';
  public toastType: string = '';
  public toastVisible: boolean = false;

  private showDeletedAnnouncementMessage(): void {
    this.toastMessage = 'Announcement deleted successfully';
    this.toastType = 'success';
    this.toastVisible = true;
  }
  private showErrorMessage(errorMessage: string): void {
    this.toastMessage = errorMessage;
    this.toastType = 'error';
    this.toastVisible = true;
  }
}
