import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/Models/announcement';
import { AnnouncementService } from 'src/app/Services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  constructor(private _activatedRoute:ActivatedRoute, private _announcementService:AnnouncementService){}
  ngOnInit(): void {
    this.currentAnnouncement.id = this._activatedRoute.snapshot.params["id"];
    this._announcementService.getAnnouncementById(this.currentAnnouncement.id!).subscribe({
      next:(ann:any)=>{
        this.currentAnnouncement = ann;


      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  public currentAnnouncement:Announcement =  {
    id:null,
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



}
