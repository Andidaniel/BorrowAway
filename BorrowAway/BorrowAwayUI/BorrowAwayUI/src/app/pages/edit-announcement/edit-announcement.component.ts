import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { Announcement } from 'src/app/models/announcement';
import { ButtonData } from 'src/app/models/button-data';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent {
  constructor(
    private _announcementService: AnnouncementService,
    private _authService: AuthService,
    private _router: Router,
    private _categoryService: CategoryService,
    private _errorService: ErrorHandlingService,
    private _activatedRoute:ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe((cat) => {
      this.categorySelectBoxData = new ArrayStore({
        data: cat,
        key: 'ID',
      });
    });
    this.announcement.id = this._activatedRoute.snapshot.params['id'];
    this._announcementService.getAnnouncementById(this.announcement.id!).subscribe({
      next:(ann:Announcement)=>{
        this.announcement=ann;
        this.image1Preview = this.announcement.imagesData[0]!=null ? this.announcement.imagesData[0]! : undefined;
        this.image2Preview = this.announcement.imagesData[1]!=null ? this.announcement.imagesData[1]! : undefined;
        this.image3Preview = this.announcement.imagesData[2]!=null ? this.announcement.imagesData[2]! : undefined;

      }
    })

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
  public onCategorySelected(event: any) {
    this.announcement.categoryId = event.value;
  }

  public image1Preview: string | undefined;
  public image2Preview: string | undefined;
  public image3Preview: string | undefined;

  public announcement: Announcement = {
    id: 0,
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

  public onImage1Uploaded(event: any): void {
    if (event.value.length == 0) {
      this.image1Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image1Preview = event.target.result;
    };

    reader.readAsDataURL(event.value[0] ?? null);
  }

  public onImage2Uploaded(event: any): void {
    if (event.value.length == 0) {
      this.image2Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image2Preview = event.target.result;
    };
    reader.readAsDataURL(event.value[0] ?? null);
  }

  public onImage3Uploaded(event: any): void {
    if (event.value.length == 0) {
      this.image3Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image3Preview = event.target.result;
    };
    reader.readAsDataURL(event.value[0] ?? null);
  }

  public calculateCreateButtonDisabled() {
    if (
      this.announcement.categoryId != null &&
      this.announcement.description != null &&
      this.announcement.location != null &&
      this.announcement.pricePerDay != null &&
      this.announcement.title != null &&
      this.announcement.contactMethod != null &&
      this.announcement.description != '' &&
      this.announcement.location != '' &&
      this.announcement.title != '' &&
      this.announcement.contactMethod != ''
    ) {
      this.createButtonDisabled = false;
    } else {
      this.createButtonDisabled = true;
    }
  }

  public onCreateButtonClick() {
    this.createButtonDisabled = true;
    this.announcement.imagesData = [];
    if (this.image1Preview != undefined) {
      this.announcement.imagesData.push(this.image1Preview);
    }
    if (this.image2Preview != undefined) {
      this.announcement.imagesData.push(this.image2Preview);
    }
    if (this.image3Preview != undefined) {
      this.announcement.imagesData.push(this.image3Preview);
    }
    this.announcement.numberOfImages = this.announcement.imagesData.length;

    this._announcementService.postAnnouncement(this.announcement).subscribe({
      next: (response: any) => {
        this.showUpdatedAnnouncementMessage();
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

  private showUpdatedAnnouncementMessage(): void {
    this.toastMessage = 'Announcement updated successfully. Redirecting...';
    this.toastType = 'success';
    this.toastVisible = true;
  }
  private showErrorMessage(errorMessage: string): void {
    this.toastMessage = errorMessage;
    this.toastType = 'error';
    this.toastVisible = true;
  }
}
