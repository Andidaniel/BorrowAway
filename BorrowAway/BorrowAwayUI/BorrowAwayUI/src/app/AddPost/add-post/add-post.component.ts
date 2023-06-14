import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { Announcement } from 'src/app/Models/announcement';
import { ButtonData } from 'src/app/Models/button-data';
import { AnnouncementService } from 'src/app/Services/announcement.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ErrorHandlingService } from 'src/app/Services/error-handling.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(
    private _announcementService: AnnouncementService,
    private _authService: AuthService,
    private _router: Router,
    private _categoryService: CategoryService,
    private _errorService:ErrorHandlingService
  ) {}
  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categorySelectBoxData = new ArrayStore({
        data: cat,
        key: 'ID',
      });
    });
  }
  @ViewChild('announcementForm', { static: false })
  announcementForm: DxFormComponent;

  categorySelectBoxData: any;
  createButtonDisabled: boolean = true;

  buttonsData: ButtonData[] = [
    {
      buttonText: 'Home Page',
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
      console.log(this.categorySelectBoxData);
      return;
    }
  }
  public onCategorySelected(event: any) {
    this.announcement.CategoryId = event.value;
  }

  public image1Preview: string | undefined;
  public image2Preview: string | undefined;
  public image3Preview: string | undefined;

  public announcement: Announcement = {
    Title: null,
    Description: null,
    NumberOfImages: null,
    PricePerDay: null,
    CreationDate: new Date(),
    ContactMethod: null,
    Location: null,
    CategoryId: null,
    UserId: null,
    ImagesData: [],
  };

  public onImage1Uploaded(event: any): void {
    if (event.value.length == 0) {
      console.log('Image1 removed');
      this.image1Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image1Preview = event.target.result;
      console.log('Uploaded Img1');
    };

    reader.readAsDataURL(event.value[0] ?? null);
  }

  public onImage2Uploaded(event: any): void {
    if (event.value.length == 0) {
      console.log('Image2 removed');
      this.image2Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image2Preview = event.target.result;
      console.log('Uploaded Img2');
    };
    reader.readAsDataURL(event.value[0] ?? null);
  }

  public onImage3Uploaded(event: any): void {
    if (event.value.length == 0) {
      console.log('Image3 removed');
      this.image3Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image3Preview = event.target.result;
      console.log('Uploaded Img3');
    };
    reader.readAsDataURL(event.value[0] ?? null);
  }

  public calculateCreateButtonDisabled() {
    if (
      this.announcement.CategoryId != null &&
      this.announcement.Description != null &&
      this.announcement.Location != null &&
      this.announcement.PricePerDay != null &&
      this.announcement.Title != null &&
      this.announcement.ContactMethod != null &&
      this.announcement.Description != '' &&
      this.announcement.Location != '' &&
      this.announcement.Title != '' &&
      this.announcement.ContactMethod != ''
    ) {
      this.createButtonDisabled = false;
    } else {
      this.createButtonDisabled = true;
    }
  }

  public onCreateButtonClick() {
    this.createButtonDisabled = true;
    this.announcement.ImagesData = [];
    if (this.image1Preview != undefined) {
      this.announcement.ImagesData.push(this.image1Preview);
    }
    if (this.image2Preview != undefined) {
      this.announcement.ImagesData.push(this.image2Preview);
    }
    if (this.image3Preview != undefined) {
      this.announcement.ImagesData.push(this.image3Preview);
    }
    this.announcement.NumberOfImages = this.announcement.ImagesData.length;


    this._announcementService.postAnnouncement(this.announcement).subscribe({
      next: (response: any) => {

        this.showCreatedAnnouncementMessage();
        setTimeout(() => {
          this._router.navigateByUrl('home');
        }, 3000);
      },
      error: (err) => {
        this.showErrorMessage(this._errorService.getError(err.error));
        this.createButtonDisabled = false;
      },
    });
  }

  public toastMessage: string = ' ';
  public toastType: string = '';
  public toastVisible: boolean = false;

  private showCreatedAnnouncementMessage(): void {
    this.toastMessage = 'Announcement created successfully';
    this.toastType = 'success';
    this.toastVisible = true;
  }
  private showErrorMessage(errorMessage: string): void {
    this.toastMessage = errorMessage;
    this.toastType = 'error';
    this.toastVisible = true;
  }
}
