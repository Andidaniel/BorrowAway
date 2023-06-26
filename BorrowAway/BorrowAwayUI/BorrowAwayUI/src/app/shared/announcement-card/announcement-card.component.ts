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

  constructor(private _router: Router) {}

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

    console.log('DELETE');
    // TODO
  }
}
