import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Output, EventEmitter } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss'],
})
export class AnnouncementCardComponent {
  @Input() announcement: any;
  @Input() categories: any[] = [];
  @Input() clickFunction: any;
  @Input() editable: boolean = false;

  @Output() deletedEvent = new EventEmitter<Announcement>();
  @Output() errorEvent = new EventEmitter<string>();

  deletePopupVisible: boolean = false;
  deleteButtonOptions: any;
  closeButtonOptions: any;

  constructor(
    private readonly _router: Router,
    private readonly _announcementService: AnnouncementService
  ) {
    const that = this;

    this.deleteButtonOptions = {
      icon: 'trash',
      text: 'Delete',
      onClick(e: any) {
        that._announcementService
          .deleteAnnouncement(that.announcement.id)
          .subscribe({
            next: (response: any) => {
              that.onDeleteSuccess();
            },
            error: (err: any) => {
              that.errorEvent.emit(err.message);
            },
          });
      },
    };

    this.closeButtonOptions = {
      icon: 'remove',
      text: 'Close',
      onClick(e: any) {
        that.deletePopupVisible = false;
      },
    };
  }

  getCategoryNameById(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.title : '';
  }

  onView(id: number) {
    this._router.navigateByUrl('announcement/' + id);
    return;
  }

  onEdit() {
    if (this.editable === false) return;

    console.log('EDIT');
    // TODO
  }

  onDelete() {
    if (this.editable === false) return;
    this.deletePopupVisible = true;
  }

  onDeleteSuccess() {
    this.deletePopupVisible = false;
    this.deletedEvent.emit(this.announcement);
  }
}
