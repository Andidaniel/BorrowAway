import { Component } from '@angular/core';
import { Announcement } from 'src/app/Models/announcement';
import { AnnouncementService } from 'src/app/Services/announcement.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  constructor(private _announcementService: AnnouncementService) {}

  public image1Preview: string | undefined;
  public announcement:Announcement = {
    Title:'Test',
    Description:'abc',
    NumberOfImages:0,
    PricePerDay:0,
    CreationDate:new Date(),
    ContactMethod:'CM2023' ,
    Location:'Codlea',
    CategoryId:-1,
    UserId:-1,
    ImagesData:[]
  }

  public onValueChanged(event: any): void {
    if (event.value.length == 0) {
      this.image1Preview = undefined;
      return;
    }
///TODO: TREAT CASE OF IMG REMOVE (X)
    const reader = new FileReader();

    reader.onload = (event: any): void => {
      this.image1Preview = event.target.result;

      this.announcement.ImagesData.push(this.image1Preview!);

      this._announcementService.postAnnouncement(this.announcement).subscribe({
        next:(resp:any) => {
          console.log(resp.body);
        },
        error:(err:any)=>{
          console.log(err.error);
        }
      });
    };

    reader.readAsDataURL(event.value[0] ?? null);
  }
}
