import { Component } from '@angular/core';
import { ButtonData } from '../../models/button-data';
import { Announcement } from '../../models/announcement';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { BorrowRequest } from 'src/app/models/borrow-request';
import { BorrowRequestService } from 'src/app/services/borrow-request.service';

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

  categories: any[] = [];

  userName: string = '?';
  userEmail: string = '?';
  userAnnouncements: Announcement[] = [];
  userBorrowRequests: any[] = [];
  userLendOpportunities: any[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _categoryService: CategoryService,
    private readonly _announcementService: AnnouncementService,
    private readonly _borrowRequestService: BorrowRequestService
  ) {}

  ngOnInit(): void {
    const userData = this._authService.getUserData();
    this.userName = userData.name;
    this.userEmail = userData.email;

    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
    });

    this._announcementService.getAllUserAnnouncements().subscribe((ann) => {
      this.userAnnouncements = ann;
    });

    this._borrowRequestService.getUserBorrowRequests().subscribe((requests) => {
      this.userBorrowRequests = requests;
    });

    this._borrowRequestService
      .getUserLendOpportunities()
      .subscribe((opportunities) => {
        this.userLendOpportunities = opportunities;
      });
  }

  public onAnnouncementDelete(announcement: Announcement) {
    let index = this.userAnnouncements.indexOf(announcement);
    if (index !== -1) {
      this.userAnnouncements.splice(index, 1);
      this.showDeletedAnnouncementMessage();
    }
  }

  public onDeleteError(errorMessage: string) {
    this.showErrorMessage(errorMessage);
  }

  public onViewBorrowRequest(request: any) {
    // TODO
  }

  public onDeleteBorrowRequest(request: any) {
    // TODO
  }

  public onApproveLendOpportunity(opportunity: any) {
    // TODO
  }

  public onDennyLendOpportunity(opportunity: any) {
    // TODO
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

  // Profile Navbar
  public readonly SUBPAGE_ANNOUNCEMENTS = 0;
  public readonly SUBPAGE_BORROW = 1;
  public readonly SUBPAGE_LEND = 2;
  public currentSubpage = this.SUBPAGE_ANNOUNCEMENTS;

  public navigateToSubpage(subpage: number) {
    this.currentSubpage = subpage;
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
