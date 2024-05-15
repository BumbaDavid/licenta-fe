import { Component, OnInit } from '@angular/core';

export enum Tab {
  PROFILE, CV, JOB_REQUESTS, CLOSE_ACCOUNT
}
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  public tab = Tab;

  openedTab: Tab | undefined;
  constructor() { }

  ngOnInit(): void {
    this.openedTab = Tab.PROFILE;
  }

  changeTab(newTab: Tab) {
      this.openedTab = newTab;
  }
}
