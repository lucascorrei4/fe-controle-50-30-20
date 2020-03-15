import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calcule-agora',
  templateUrl: './calcule-agora.component.html',
  styleUrls: ['./calcule-agora.component.scss']
})
export class CalculeAgoraComponent implements OnInit {

  @ViewChild('calculeAgora', { static: true }) calculeAgoraDiv: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }
}
