import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonData } from '../../models/button-data';
import { AnnouncementService } from '../../services/announcement.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { Announcement } from '../../models/announcement';

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
      redirectUrl: 'profile',
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

  private readonly STATUS_ALL = 'All Announcements';
  private readonly STATUS_SEARCH = 'Search By: ';
  private readonly STATUS_CATEGORY = 'Filter By: ';
  filterStatus: string = this.STATUS_ALL;
  filterValue: string = '';

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _announcementService: AnnouncementService,
    private readonly _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
      this.filterAnnouncements();
    });
  }

  filterAnnouncements() {
    const searchPredicate = this._activatedRoute.snapshot.queryParams['search'];
    const categoryId = this._activatedRoute.snapshot.queryParams['category'];

    // search predicate filter
    if (searchPredicate) {
      this.filterStatus = this.STATUS_SEARCH;
      this.filterValue = searchPredicate;

      this._announcementService
        .getAnnouncementBySearchPredicate(searchPredicate)
        .subscribe((ann) => {
          this.announcements = ann;
        });
    }

    // category filter
    else if (categoryId) {
      this.filterStatus = this.STATUS_CATEGORY;
      this.filterValue = this.getCategoryNameById(+categoryId);

      this._announcementService
        .getAnnouncementByCategoryId(categoryId)
        .subscribe((ann) => {
          this.announcements = ann;
        });
    }

    // no filter (get all)
    else {
      this.filterStatus = this.STATUS_ALL;
      this.filterValue = '';

      this._announcementService.getAllAnnouncements().subscribe((ann) => {
        this.announcements = ann;
      });
    }
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.title : '';
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
    } else if (redirectUrl == 'profile') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
