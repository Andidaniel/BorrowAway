import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonData } from '../Models/button-data';
import { AnnouncementService } from '../Services/announcement.service';
import { AuthService } from '../Services/auth.service';
import { CategoryService } from '../Services/category.service';
import { Announcement } from '../Models/announcement';

@Component({
  selector: 'app-announcements-page',
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
})
export class AnnouncementsPageComponent {
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

  announcements: Announcement[] = [];
  categories: any[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _announcementService: AnnouncementService,
    private readonly _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const searchPredicate = this._activatedRoute.snapshot.queryParams['search'];
    const categoryId = this._activatedRoute.snapshot.queryParams['category'];

    // search predicate filter
    if (searchPredicate) {
      this._announcementService
        .getAnnouncementBySearchPredicate(searchPredicate)
        .subscribe((ann) => {
          this.announcements = ann;
        });
    }

    // category filter
    else if (categoryId) {
      this._announcementService
        .getAnnouncementByCategoryId(categoryId)
        .subscribe((ann) => {
          this.announcements = ann;
        });
    }

    // no filter (get all)
    else {
      this._announcementService.getAllAnnouncements().subscribe((ann) => {
        this.announcements = ann;
      });
    }

    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
    });
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
    } else if (redirectUrl == 'editProfile') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
