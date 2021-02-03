import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StorageService } from "src/app/services/storage.service";
import { Lancamento } from "src/app/models/lancamento";
import { Despesa } from "src/app/models/despesa";
import { DespesaEnum } from "src/app/enums/despesas-enum";
import { UtilService } from "src/app/services/util.service";
import { DespesaItem } from "src/app/models/despesa-item";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
import { Launch } from "src/app/models/launch";
import { MatDialog, MatTabChangeEvent } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, shareReplay } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalConfirmationComponent } from "../../modal-confirmation/modal-confirmation.component";

@Component({
  selector: "bottom-sheet-open-launches-by-month",
  templateUrl: "bottom-sheet-open-launches-by-month.component.html",
  styleUrls: ["bottom-sheet-open-launches-by-month.component.scss"],
})
export class BottomSheetLaunchesByMonthComponent implements OnInit {
  public lancamentos: Lancamento[];
  public despesas: Despesa[] = [];
  public despesasSelecionadas: Despesa[] = [];
  public DespesaEnum = DespesaEnum;
  public mesAtual: string = null;
  public launches: Launch[] = [];
  public launchesGrouped: any[] = [];
  public selectedMonth: string = null;
  public tabIndex = 1;
  public launchTypes = ["FIXAS", "VARIAVEIS", "INVESTIMENTOS"];

  private launchesGroupedSubject: BehaviorSubject<any[]> = new BehaviorSubject(
    []
  );
  private selectedMontSubject: BehaviorSubject<string> = new BehaviorSubject(
    null
  );

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetLaunchesByMonthComponent>,
    private snackBar: MatSnackBar,
    private utilService: UtilService,
    private controleService: Controle503020Service,
    private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.controleService.selectedMonth$.subscribe((res) => {
      this.selectedMontSubject.next(res);
      this.loadLaunchesBySelectedMonth();
    });
  }

  private async loadLaunchesBySelectedMonth() {
    let user = this.storageService.getLocalUser();
    this.launches = await this.controleService
      .findLaunchesByUserIdAndMonthAndType(
        user._id,
        this.selectedMontSubject.value
      )
      .toPromise();
    this.groupLaunches(this.launches);
  }

  public async findByRepeatedLaunch(item: Launch) {
    let user = this.storageService.getLocalUser();
    let launch = [];
    launch.push(
      await this.controleService
        .findByUserIdCategoryAndValue(user._id, item.categoryId, item.valor)
        .toPromise()
    );

    return launch;
  }

  public groupLaunches(launches) {
    var groups = new Set(launches.map((item) => item.type));
    groups.forEach((g) =>
      this.launchesGrouped.push({
        name: g,
        subItems: launches.filter((i) => i.type === g),
      })
    );
    this.launchesGroupedSubject.next(this.launchesGrouped);
  }

  selectedTabChange(mes: string) {}

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getFormattedPrice(price: number) {
    return this.utilService.getFormattedPrice(price).substring(3);
  }

  remove(launch: Launch, subItems) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        title: `Deseja mesmo remover ` + launch.description + "?",
        description: this.sanitizer.bypassSecurityTrustHtml(
          `<h4 style="font-weight: normal"><strong>Atenção: </strong>Este item não estará mais listado nas despesas deste mês (${this.selectedMontSubject.value}).</h4>
          <div class="text-center m-2">
            <img style="max-width: 70%" src="assets/img/svg/lose-info.svg">
          </div>`
        ),
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.controleService.removeLaunch(launch._id).subscribe((res) => {
          this.launchesGrouped.find(
            (group) => group.name === launch.type
          ).subItems = subItems.filter((item) => item._id !== launch._id);
          this.launchesGroupedSubject.next(this.launchesGrouped);
          this.changeDetector.detectChanges();
        });
      }
    });
  }

  calcularTotal(launches): string {
    let valorTotal = 0;
    for (let item of launches) {
      valorTotal += item.valor;
    }
    return this.getFormattedPrice(valorTotal);
  }

  calcularTotalGeral(): string {
    let total = 0;
    if (this.launchesGrouped.length > 0) {
      this.launchesGrouped.forEach((group) => {
        total += group.subItems.reduce(
          (sum, current) => sum + current.valor,
          0
        );
      });
    }

    return this.getFormattedPrice(total);
  }

  get launchesGroupedSubject$(): Observable<any[]> {
    return this.launchesGroupedSubject
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay());
  }

  get selectedMontSubject$(): Observable<string> {
    return this.selectedMontSubject
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay());
  }
}
