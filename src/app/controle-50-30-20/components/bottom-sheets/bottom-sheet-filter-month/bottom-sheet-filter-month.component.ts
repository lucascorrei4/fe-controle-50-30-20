import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatBottomSheetRef,
  MatIconRegistry,
  MatSnackBar,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { expand } from "src/app/shared/animations/animations";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "bottom-sheet-filter-month",
  templateUrl: "bottom-sheet-filter-month.component.html",
  styleUrls: ["./bottom-sheet-filter-month.component.scss"],
  animations: [expand],
})
export class BottomSheetFilterMonthComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public form: FormGroup;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetFilterMonthComponent>,
    public fb: FormBuilder
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nome: [null],
    });
  }
}
