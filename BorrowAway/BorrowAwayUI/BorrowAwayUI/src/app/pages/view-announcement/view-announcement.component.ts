import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public minStartDate: Date = new Date();
  public startDate: Date | string | number = new Date();
  public endDate: Date | string | number;
  public totalPrice: number = 0;

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
    private _categoryService: CategoryService,
    private _authService: AuthService,
    private _requestService: BorrowRequestService,
    private _router: Router
  ) {
    const that = this;

    this.borrowButtonOptions = {
      icon: 'cart',
      text: 'Borrow',
      onClick(e: any) {
        // TODO
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
    this.currentAnnouncement.id = this._activatedRoute.snapshot.params['id'];
    this._announcementService
      .getAnnouncementById(this.currentAnnouncement.id!)
      .subscribe({
        next: (ann: any) => {
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
          console.log(err);
        },
      });
  }

  public onDatesChange() {
    if (!this.startDate || !this.endDate) return;

    let days = this.getDaysBetweenDates(
      this.startDate as Date,
      this.endDate as Date
    );
    this.totalPrice = days * this.currentAnnouncement.pricePerDay!;
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
}
