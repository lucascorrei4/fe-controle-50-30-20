import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from "@angular/core";
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { Subject } from "rxjs";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
import { Launch } from "src/app/models/launch";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "bottom-sheet-open-repeated-launches",
  templateUrl: "bottom-sheet-open-repeated-launches.component.html",
  styleUrls: ["bottom-sheet-open-repeated-launches.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BottomSheetRepeatedLaunchesComponent implements OnInit {
  public reloadLaunchesSubject: Subject<boolean> = new Subject<boolean>();
  public monthExpensesSubject: Subject<number> = new Subject<number>();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetRepeatedLaunchesComponent>
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.reloadLaunchesSubject.next(true);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
