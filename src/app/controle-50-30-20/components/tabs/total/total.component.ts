import { Component, Input } from "@angular/core";

export class GraphData {
  title: string;
  type: string;
  totalType: number;
  totalRef?: number;
  position: any[];
}

@Component({
  selector: "app-total",
  templateUrl: "./total.component.html",
  styleUrls: ["./total.component.scss"],
})
export class TotalComponent {
  @Input() type: string;
  @Input() selectedMonthDesc: string;
  @Input() total: number;

  constructor() {}

  isNumber(e) {
    return typeof e === "number";
  }
}
