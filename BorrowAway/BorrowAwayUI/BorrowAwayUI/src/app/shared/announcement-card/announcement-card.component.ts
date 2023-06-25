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

  constructor(private _router: Router) {}

  getCategoryNameById(id: number): string {
    const category = this.categories.find((c) => c.id === id);
    return category ? category.title : '';
  }

  onViewAnnouncementClick(id: number) {
    this._router.navigateByUrl('announcement/' + id);
    return;
  }
}
