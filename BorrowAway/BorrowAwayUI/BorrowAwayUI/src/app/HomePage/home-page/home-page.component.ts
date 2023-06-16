import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/Models/announcement';
import { ButtonData } from 'src/app/Models/button-data';
import { Category } from 'src/app/Models/category';
import { AnnouncementService } from 'src/app/Services/announcement.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';

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
    private _categoryService:CategoryService
  ) {}

  announcements:Announcement[]=[];
  categories:any[]=[];

  ngOnInit(): void {
    this._announcementService.getLastSixAnnouncements().subscribe((ann) => {
      this.announcements = ann;
    });
    this._categoryService.getAllCategories().subscribe((cat)=>{
      this.categories = cat;
    });
  }

  buttonsData: ButtonData[] = [
    {
      buttonText: 'List item',
      redirectUrl: 'listItem',
      iconName: 'add_circle_outline',
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

  getCategoryNameById(id: number): string {
    const category = this.categories.find(c => c.id === id);
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
    } else if (redirectUrl == 'listItem') {
      this._router.navigateByUrl(redirectUrl);
      return;
    } else if (redirectUrl == 'editProfile') {
      this._router.navigateByUrl(redirectUrl);
      return;
    }
  }
}
