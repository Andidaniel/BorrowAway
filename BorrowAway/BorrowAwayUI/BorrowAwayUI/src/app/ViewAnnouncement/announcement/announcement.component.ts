import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'src/app/Models/announcement';
import { ButtonData } from 'src/app/Models/button-data';
import { AnnouncementService } from 'src/app/Services/announcement.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _announcementService: AnnouncementService,
    private _categoryService: CategoryService,
    private _authService: AuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.currentAnnouncement.id = this._activatedRoute.snapshot.params['id'];
    this._announcementService
      .getAnnouncementById(this.currentAnnouncement.id!)
      .subscribe({
        next: (ann: any) => {
          this.currentAnnouncement = ann;

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

  public categoryName: string = '';
  public posterName: string = '';

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
