import { Component } from '@angular/core';
import { single, multi } from '../charts.data';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styles: ['pie.component.scss']
})
export class PieComponent {
  public single: any[];
  public multi: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public view: any;

  constructor() {
    Object.assign(this, { single, multi });
    this.view = [innerWidth / 1.3, 800];
    this.single = [
      {
        name: 'Fixos (50%)',
        value: 4000.32
      },
      {
        name: 'Lazer (30%)',
        value: 2000.90
      },
      {
        name: 'Invest. (20%)',
        value: 800.84
      }
    ];
  }

  public onSelect(event) {
    console.log(event);
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}