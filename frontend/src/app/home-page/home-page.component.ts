import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('http://localhost:3000').subscribe(
      (response) => {
        console.log(response);
      },
      (errors) => {
        console.log(errors);
      }
    );
  }

}
