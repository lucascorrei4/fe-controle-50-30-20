import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators";
import { Launch } from "src/app/models/launch";
import { StorageService } from "src/app/services/storage.service";
import { Controle503020Service } from "../../controle-50-30-20.service";
import { BottomSheetFilterMonthComponent } from "../bottom-sheets/bottom-sheet-filter-month/bottom-sheet-filter-month.component";
import { BottomSheetGraficoDespesasComponent } from "../bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetLoginComponent } from "../bottom-sheets/bottom-sheet-login/bottom-sheet-login.component";
import { BottomSheetLaunchesByMonthComponent } from "../bottom-sheets/bottom-sheet-open-launches-by-month/bottom-sheet-open-launches-by-month.component";
import { BottomSheetShareComponent } from "../bottom-sheets/bottom-sheet-share/bottom-sheet-share.component";

@Component({
  selector: "app-footer-menu",
  templateUrl: "./footer-menu.component.html",
  styleUrls: ["./footer-menu.component.scss"],
})
export class FooterMenuComponent implements OnInit {
  public contLancamentoDespesas: number = 0;
  @Output() clickMenuLateral = new EventEmitter<never>();
  private selectedMontSubject: BehaviorSubject<string> = new BehaviorSubject(
    null
  );

  constructor(
    private bottomSheet: MatBottomSheet,
    private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private controleService: Controle503020Service
  ) {
    this.controleService.listenUpdateBadgesObservable().subscribe(() => {
      this.getSelectedMonthAndUpdateBadges();
    });
  }

  ngOnInit(): void {
    this.getSelectedMonthAndUpdateBadges();
  }

  getSelectedMonthAndUpdateBadges() {
    this.controleService.selectedMonth$.subscribe((res) => {
      this.selectedMontSubject.next(res);
      this.updateCountLaunches();
    });
  }

  abrirGraficoDespesasBottomSheet() {
    this.bottomSheet.open(BottomSheetGraficoDespesasComponent, {
      data: {
        selectedMonthDesc: this.selectedMontSubject.value,
      },
    });
  }

  openBottomSheetLaunchesByMonthComponent() {
    console.log("this.selectedMontSubject.value", this.selectedMontSubject.value);
    
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetLaunchesByMonthComponent,
      {
        data: {
          selectedMonthDesc: this.selectedMontSubject.value,
          monthExpenses: this.controleService.totalExpenses.value,
        },
      }
    );
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.updateCountLaunches();
    });
  }

  private async updateCountLaunches() {
    let user = this.storageService.getLocalUser();
    if (!user) {
      return;
    }
    await this.controleService
      .findLaunchesByAccountIdAndMonthAndType(
        user.accountId,
        this.selectedMontSubject.value
      )
      .toPromise()
      .then((launches: Launch[]) => {
        let valorTotal = 0;
        for (let item of launches) {
          valorTotal += item.valor;
        }
        this.controleService.totalExpenses.next(valorTotal);
        this.contLancamentoDespesas = launches.length;
        this.changeDetector.detectChanges();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetLoginComponent);
  }

  abrirFilterMonthoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetFilterMonthComponent);
  }

  abrirShareBottomSheet(): void {
    this.bottomSheet.open(BottomSheetShareComponent, {
      data: {
        url: window.location.href,
        message: "message",
        messageWhatsapp: "Msg",
        title: "title",
      },
    });
  }

  abrirMenuLateral(): void {
    this.clickMenuLateral.next();
  }

  get selectedMontSubject$(): Observable<string> {
    return this.selectedMontSubject
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay());
  }
}
