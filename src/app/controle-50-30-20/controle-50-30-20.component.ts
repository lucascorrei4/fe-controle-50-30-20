import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  LOCALE_ID,
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import {} from "@angular/forms";
import { UtilService } from "../services/util.service";

import { StorageService } from "../services/storage.service";
import { BottomSheetLoginComponent } from "./components/bottom-sheets/bottom-sheet-login/bottom-sheet-login.component";
import { Controle503020Service } from "./controle-50-30-20.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-controle-50-30-20",
  templateUrl: "./controle-50-30-20.component.html",
  styleUrls: ["./controle-50-30-20.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Controle503020Component implements OnInit {
  public currentMonth: string;

  constructor(
    private storageService: StorageService,
    private bottomSheet: MatBottomSheet,
    private utilService: UtilService,
    private controle503020Service: Controle503020Service,
    private changeDetector: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.getCurrentMonth();
  }

  ngOnInit() {
    this.verifyLoggedUser();
  }

  verifyLoggedUser() {
    if (this.utilService.isEmpty(this.storageService.getLocalUser())) {
      this.openLogin();
    } else {
      this.controle503020Service.updateEarningTotals();
      this.controle503020Service.updateLaunchTotals();
    }
  }

  openLogin() {
    const bottomSheefNovaDespesaRef = this.bottomSheet.open(
      BottomSheetLoginComponent,
      {
        disableClose: true,
      }
    );
    bottomSheefNovaDespesaRef.afterDismissed().subscribe((response) => {
      this.controle503020Service.updateEarningTotals();
      this.controle503020Service.updateLaunchTotals();
      this.changeDetector.detectChanges();
    });
  }

  getCurrentMonth() {
    this.currentMonth = formatDate(new Date(), "MM/yyyy", this.locale);
    this.controle503020Service.selectedMonth.next(this.currentMonth);
  }
}
