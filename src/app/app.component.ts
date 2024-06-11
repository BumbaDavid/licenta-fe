import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'licenta-fe';
  isLoggedin = false;

  ngOnInit(): void {
    if(localStorage.getItem('api_key')){
      this.isLoggedin = true;
    }
  }
}
