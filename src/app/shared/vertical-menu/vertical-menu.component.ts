import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId;
  constructor() { }

  ngOnInit() {
  }

  onClick(menuId) {
  }

}
