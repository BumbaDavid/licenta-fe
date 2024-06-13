import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  accountType: any;
  isLoggedin = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('api_key')){
      this.isLoggedin = true;
    }
   this.accountType = localStorage.getItem('account_type') ? localStorage.getItem('account_type') : null;
  }
}
