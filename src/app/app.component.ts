import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ApiService, Item } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'controle-50-30-20';
  items: Array<Item>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.fetch().subscribe(
      (data: Array<Item>) => {
        this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }
}
