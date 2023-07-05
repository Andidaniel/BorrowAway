import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Announcement } from 'src/app/models/announcement';
import { ButtonData } from 'src/app/models/button-data';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowRequestService } from 'src/app/services/borrow-request.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss'],
})
export class ViewAnnouncementComponent implements OnInit {
  public unavailableDates: Date[] = [];
  public categoryName: string = '';
  public posterName: string = '';
  public myContext = this;
  public minStartDate: Date = new Date();
  public startDate: Date | string | number = new Date();
  public endDate: Date | string | number;
  public totalPrice: number = 0;
  public loggedInUserName: string;
  public loading: boolean = true;

  public currentAnnouncement: Announcement = {
    id: null,
    title: null,
    description: null,
    numberOfImages: null,
    pricePerDay: null,
    creationDate: new Date(),
    contactMethod: null,
    location: null,
    categoryId: null,
    userId: null,
    imagesData: [],
  };

  buttonsData: ButtonData[] = [
    {
      buttonText: 'Home Page',
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

  borrowPopupVisible: boolean = false;
  borrowButtonOptions: any;
  closeButtonOptions: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _announcementService: AnnouncementService,
    private _borrowRequestService: BorrowRequestService,
    private _categoryService: CategoryService,
    private _authService: AuthService,
    private _requestService: BorrowRequestService,
    private _router: Router
  ) {
    let token: string | null = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      this.loggedInUserName = decodedToken.name;
    }
    const that = this;

    this.borrowButtonOptions = {
      icon: 'cart',
      text: 'Borrow',
      onClick(e: any) {
        that._borrowRequestService
          .postBorrowRequest(
            that.currentAnnouncement.id!,
            that.startDate as Date,
            that.endDate as Date
          )
          .subscribe({
            next: (response: any) => {
              that.onBorrowSuccess();
            },
            error: (err: any) => {
              that.onBorrowError(err);
            },
          });
      },
    };

    this.closeButtonOptions = {
      icon: 'remove',
      text: 'Close',
      onClick(e: any) {
        that.borrowPopupVisible = false;
      },
    };
  }

  ngOnInit(): void {


    this.maxEndDate = this.getMaxEndDate(new Date(this.startDate));
    this.currentAnnouncement.id = this._activatedRoute.snapshot.params['id'];
    this._announcementService
      .getAnnouncementById(this.currentAnnouncement.id!)
      .subscribe({
        next: (ann: any) => {
          this.loading = false;
          this.currentAnnouncement = ann;
          this._requestService
            .getUnavailableDaysForAnnouncement(this.currentAnnouncement.id!)
            .subscribe({
              next: (dates: Date[]) => {
                dates.forEach((d) => {
                  const _date = new Date(d);
                  this.unavailableDates.push(
                    new Date(
                      Date.UTC(
                        _date.getFullYear(),
                        _date.getMonth(),
                        _date.getDate()
                      )
                    )
                  );
                });
              },
            });

          this._categoryService
            .getCategoryById(this.currentAnnouncement.categoryId!)
            .subscribe({
              next: (cat: any) => {
                this.categoryName = cat.title;
              },
              error: (err: any) => {
                return '';
              },
            });

          this._announcementService
            .getUserNameById(this.currentAnnouncement.userId!)
            .subscribe({
              next: (resp: any) => {
                this.posterName = resp.body;
              },
            });
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
        },
      });
  }

  public onDatesChange() {
    if (!this.startDate || !this.endDate) {
      this.totalPrice = 0;
      return;
    }

    let days = this.getDaysBetweenDates(
      this.startDate as Date,
      this.endDate as Date
    );
    this.totalPrice = (days + 1) * this.currentAnnouncement.pricePerDay!;
  }

  public onStartDateChanged() {
    if (!this.startDate) {
      this.totalPrice = 0;
      return;
    }
    this.endDate = this.startDate;
    this.maxEndDate = this.getMaxEndDate(new Date(this.startDate));
  }
  public maxEndDate: Date | null = null;

  public getMaxEndDate(givenDate: Date) {
    let foundDate = null;

    for (let i = 0; i < this.unavailableDates.length; i++) {
      const currentDate = this.unavailableDates[i];

      if (
        currentDate > givenDate &&
        (foundDate === null || currentDate < foundDate)
      ) {
        foundDate = currentDate;
      }
    }

    return foundDate;
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

  private onBorrowSuccess() {
    this.borrowPopupVisible = false;
    this.showBorrowSuccessMessage();
    setTimeout(() => {
      this._router.navigateByUrl('profile');
    }, 3000);
  }

  private onBorrowError(err: any) {
    this.showBorrowErrorMessage(err.message);
    console.error(err);
  }

  private getDaysBetweenDates(startDate: Date, endDate: Date): number {
    // Convert both dates to UTC to ensure accurate calculations
    const utcStartDate = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const utcEndDate = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );

    // Calculate the number of milliseconds between the two dates
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = Math.abs(utcEndDate - utcStartDate);

    // Calculate the number of days by dividing the time difference by milliseconds per day
    const days = Math.floor(timeDifference / millisecondsPerDay);

    return days;
  }

  // Toast
  public toastMessage: string = ' ';
  public toastType: string = '';
  public toastVisible: boolean = false;

  private showBorrowSuccessMessage(): void {
    this.toastMessage = 'Borrow request created. Redirecting...';
    this.toastType = 'success';
    this.toastVisible = true;
  }
  private showBorrowErrorMessage(errorMessage: string): void {
    this.toastMessage = errorMessage;
    this.toastType = 'error';
    this.toastVisible = true;
  }
}
