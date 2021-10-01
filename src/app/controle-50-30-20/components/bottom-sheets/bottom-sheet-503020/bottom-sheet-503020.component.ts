import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";

@Component({
  selector: "bottom-sheet-503020",
  templateUrl: "bottom-sheet-503020.component.html",
  styleUrls: ["bottom-sheet-503020.component.scss"],
})
export class BottomSheet503020Component implements OnInit, AfterViewInit {
  public monthEarning;
  public selectedMonthDesc;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheet503020Component>
  ) {}

  ngOnInit() {
    this.monthEarning = this.data.monthEarning;
    this.selectedMonthDesc = this.data.selectedMonthDesc;
  }

  ngAfterViewInit() {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
