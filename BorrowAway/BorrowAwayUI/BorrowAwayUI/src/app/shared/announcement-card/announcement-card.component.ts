import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  deletePopupVisible: boolean = false;
  deleteButtonOptions: any;
  closeButtonOptions: any;

  constructor(private _router: Router) {
    this.deleteButtonOptions = {
      icon: 'trash',
      text: 'Delete',
      onClick(e: any) {
        console.log('ANNOUNCEMENT DELETED'); // TODO
      },
    };
    this.closeButtonOptions = {
      icon: 'remove',
      text: 'Cancel',
      onClick(e: any) {
        this.deletePopupVisible = false;
        console.log(this.deletePopupVisible); // TODO
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
    console.log(this.deletePopupVisible);
  }
}
