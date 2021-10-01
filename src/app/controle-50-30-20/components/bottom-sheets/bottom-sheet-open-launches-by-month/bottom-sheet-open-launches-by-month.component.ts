import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "bottom-sheet-open-launches-by-month",
  templateUrl: "bottom-sheet-open-launches-by-month.component.html",
  styleUrls: ["bottom-sheet-open-launches-by-month.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BottomSheetLaunchesByMonthComponent implements OnInit {
  @Input() selectedMonthDesc: string;
  @Input() monthExpenses: number;

  public reloadLaunchesSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetLaunchesByMonthComponent>
  ) {}

  ngOnInit() {
    this.reloadLaunchesSubject.next(true);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
