import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { ButtonData } from 'src/app/models/button-data';
import { Category } from 'src/app/models/category';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _announcementService: AnnouncementService,
    private _categoryService: CategoryService
  ) {}

  announcements: Announcement[] = [];
  categories: any[] = [];
  searchBoxText: string;

  public loading: boolean = true;

  ngOnInit(): void {
    this._announcementService.getLastSixAnnouncements().subscribe((ann) => {
      this.loading = false;
      this.announcements = ann;
    });

    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
    });
  }

  buttonsData: ButtonData[] = [
    {
      buttonText: 'List Item',
      redirectUrl: 'listItem',
      iconName: 'add_circle_outline',
    },
    {
      buttonText: 'Profile',
      redirectUrl: 'profile',
      iconName: 'account_circle',
    },
    {
      buttonText: 'Log Out',
      redirectUrl: '',
      iconName: 'logout',
    },
  ];

  goToAnnouncements(selectedCategory: number | null, searchText?: string) {
    this._router.navigate(
      ['/announcements'],
      selectedCategory
        ? {
            queryParams: { category: selectedCategory },
          }
        : searchText
        ? {
            queryParams: { search: searchText },
          }
        : undefined
    );
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
    } else if (redirectUrl == 'listItem') {
      this._router.navigateByUrl(redirectUrl);
      return;
    } else if (redirectUrl == 'profile') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
