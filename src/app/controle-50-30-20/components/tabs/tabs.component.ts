import { formatDate } from "@angular/common";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  ViewChild,
  LOCALE_ID,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatBottomSheet,
  MatSnackBar,
  MatTabChangeEvent,
  MatTooltip,
} from "@angular/material";
import { single } from "../../../charts.data";
import { UtilService } from "src/app/services/util.service";
import { BottomSheetListaDespesasComponent } from "../bottom-sheets/bottom-sheet-lista-despesas/bottom-sheet-lista-despesas.component";
import { BottomSheetNovaDespesa } from "../bottom-sheets/bottom-sheet-nova-despesa/bottom-sheet-nova-despesa.component";
import * as moment from "moment";
import { StorageService } from "src/app/services/storage.service";
import { BottomSheetGraficoDespesasComponent } from "../bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { User } from "src/app/models/user";
import { Controle503020Service } from "../../controle-50-30-20.service";
import { DespesaEnum } from "src/app/enums/despesas-enum";
import { BottomSheetLoginComponent } from "../bottom-sheets/bottom-sheet-login/bottom-sheet-login.component";
import { BottomSheetEarningsComponent } from "../bottom-sheets/bottom-sheet-earnings/bottom-sheet-earnings.component";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  public STR_GASTOS_50 =
    "Tudo o que você gasta de forma rotineira: moradia, aluguél, contas de energia, água e internet, alimentação, transporte, saúde, mercado, educação, seguros e doações.";
  public STR_GASTOS_30 =
    "Tudo o que você gasta de forma variável sem prioridade: despesas pessoais para entretenimento como idas ao cinema, salão de beleza, bares e restaurantes, viagens, academias, compras e cuidados pessoais...";
  public STR_GASTOS_20 =
    "Valor que você precisa poupar todo mês pensando no futuro: fundo para emergências, contratar um plano de previdência privada, fazer investimentos de longo prazo, poupança e etc...";

  public selectedMonthDesc: string;
  public formGroup: FormGroup;

  public currentMonth: any;
  public lastMonth: any;
  public nextMonth: any;

  public today = new Date();

  public meses: any[] = [];
  public single: any[] = [];

  public tabIndex = 1;

  public rendaTotal: number = 0;

  public contLancamentoDespesas: number = 0;

  @ViewChild("valorDespesa", { static: true }) valorDespesaEl: ElementRef;
  @ViewChild("calculeAgora", { static: true }) calculeAgoraDiv: ElementRef;

  view: any[] = [500, 400];

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  };

  @ViewChild("tooltip", { static: true }) matTooltip: MatTooltip;

  submitted = false;

  showLegend: boolean = true;
  showLabels: boolean = true;

  despesaEnum: DespesaEnum = DespesaEnum.Fixas;

  public monthEarning: number = 0;

  constructor(
    private utilService: UtilService,
    private bottomSheet: MatBottomSheet,
    public fb: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,
    private storageService: StorageService,
    private controle503020Service: Controle503020Service,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    Object.assign(this, { single });
    this.carregarMeses();
    this.initObservers();
    const YEARS = () => {
      const years = [];
      const dateStart = moment();
      const dateEnd = moment().add(10, "y");
      while (dateEnd.diff(dateStart, "years") >= 0) {
        years.push(dateStart.format("YYYY"));
        dateStart.add(1, "year");
      }
      return years;
    };
  }

  initObservers() {
    this.verifyEarningRef();
  }

  async verifyEarningRef() {
    let user = this.storageService.getLocalUser();
    let launch = await this.controle503020Service
      .findEarningByUserIdAndRef(user._id, this.selectedMonthDesc)
      .toPromise();
    if (launch) {
      this.monthEarning = launch.renda1 + launch.renda2 + launch.rendaExtra;
      this.changeDetector.detectChanges();
    }
  }

  loadMonthEarning() {
    this.controle503020Service.monthEarning$.subscribe((res) => {
      this.monthEarning = res;
      this.changeDetector.detectChanges();
    });
  }

  selecionarMes(mes) {
    this.selectedMonthDesc = mes;
    this.controle503020Service.selectedMonth.next(this.selectedMonthDesc);
  }

  private atualizarGraficoIdeal(rendaTotal: number) {
    this.single = [
      {
        name: "Fixo Ideal",
        value: rendaTotal * 0.5,
      },
      {
        name: "Variáveis Ideal",
        value: rendaTotal * 0.3,
      },
      {
        name: "Invest. Ideal",
        value: rendaTotal * 0.2,
      },
    ];
  }

  public enviarLancamento() {
    var user = new User();
    user.codigo = "";
    user.email = "";
    user.lancamentos = [];
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetLoginComponent);
  }

  abrirGraficoDespesasBottomSheet() {
    this.bottomSheet.open(BottomSheetGraficoDespesasComponent);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateForm(e) {
    this.formGroup.get("renda1").setValue(e);
    this.formGroup.get("renda2").setValue(e);
  }

  carregarMeses() {
    this.lastMonth = formatDate(
      this.today.setMonth(this.today.getMonth() - 1),
      "MM/yyyy",
      this.locale
    );
    this.currentMonth = formatDate(new Date(), "MM/yyyy", this.locale);
    this.nextMonth = formatDate(
      new Date().setMonth(new Date().getMonth() + 1),
      "MM/yyyy",
      this.locale
    );

    this.meses.push(this.lastMonth, this.currentMonth, this.nextMonth);

    this.selectedMonthDesc = this.currentMonth;
    this.controle503020Service.selectedMonth.next(this.selectedMonthDesc);

    this.tabIndex = this.meses.findIndex(
      (mes) => String(mes) === String(this.currentMonth)
    );
  }

  selectedTabChange(mes: string) {
    this.selectedMonthDesc = mes;
    this.controle503020Service.selectedMonth.next(this.selectedMonthDesc);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {}

  getFormattedPrice(price: number) {
    return this.utilService.getFormattedPrice(price).substring(3);
  }

  onSelect() {}

  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 500];
  }

  abrirBottomSheetDespesas(): void {
    const bottomSheefRef = this.bottomSheet.open(
      BottomSheetListaDespesasComponent
    );
    bottomSheefRef.afterDismissed().subscribe((selectedCategory) => {
      if (selectedCategory) {
        const bottomSheefNovaDespesaRef = this.bottomSheet.open(
          BottomSheetNovaDespesa,
          {
            data: {
              category: selectedCategory,
            },
          }
        );

        bottomSheefNovaDespesaRef.afterDismissed().subscribe((response) => {
          if (response) {
            this.abrirBottomSheetDespesas();
          }
        });
      }
    });
  }

  openEarnings() {
    const bottomSheefNovaDespesaRef = this.bottomSheet.open(
      BottomSheetEarningsComponent
    );
    bottomSheefNovaDespesaRef.afterDismissed().subscribe(() => {
      this.loadMonthEarning();
    });
  }

  get strGastos50(): string {
    return this.STR_GASTOS_50;
  }

  get strGastos30(): string {
    return this.STR_GASTOS_30;
  }

  get strGastos20(): string {
    return this.STR_GASTOS_20;
  }
}
