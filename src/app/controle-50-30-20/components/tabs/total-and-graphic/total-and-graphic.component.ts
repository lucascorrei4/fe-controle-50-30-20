import { Component, Input, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material";

@Component({
  selector: "app-total-and-graphic",
  templateUrl: "./total-and-graphic.component.html",
  styleUrls: [
    "./total-and-graphic.component.scss",
    "../../../node_modules/anychart/dist/css/anychart-ui.min.css",
    "../../node_modules/anychart/dist/fonts/css/anychart-font.min.css",
  ],
})
export class TotalAndGraphicComponent implements OnInit {
  @Input() type: string;
  @Input() selectedMonthDesc: string;
  @Input() total: number;
  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}
}
