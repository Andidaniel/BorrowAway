import { Component } from '@angular/core';
import { AnnouncementService } from 'src/app/Services/announcement.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  constructor(private _announcementService: AnnouncementService) {}

  public image1Preview: string | undefined;
  public image1: File[] = [];

  public onValueChanged(event: any): void {
    if (event.value.length == 0) {
      this.image1Preview = undefined;
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image1Preview = event.target.result;

      //this._announcementService.postImage(this.image1[0]).subscribe();
    };

    reader.readAsDataURL(event.value[0] ?? null);
  }
}
