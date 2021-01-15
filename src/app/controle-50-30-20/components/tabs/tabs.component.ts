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
} from "@angular/material";
import { single } from "../../../charts.data";
import { UtilService } from "src/app/services/util.service";
import { BottomSheetListaDespesasComponent } from "../bottom-sheets/bottom-sheet-lista-despesas/bottom-sheet-lista-despesas.component";
import { BottomSheetNovaDespesa } from "../bottom-sheets/bottom-sheet-nova-despesa/bottom-sheet-nova-despesa.component";
import * as moment from "moment";
import { StorageService } from "src/app/services/storage.service";
import { BottomSheetComoFuncionaComponent } from "../bottom-sheets/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component";
import { BottomSheetLancamentosDespesasComponent } from "../bottom-sheets/bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component";
import { BottomSheetGraficoDespesasComponent } from "../bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetCodigoSecretoComponent } from "../bottom-sheets/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component";
import { User } from "src/app/models/user";
import { Lancamento } from "src/app/models/lancamento";
import { Despesa } from "src/app/models/despesa";
import { DespesaItem } from "src/app/models/despesa-item";
import { ApiService } from "src/app/services/api.service";
import { Controle503020Service } from "../../controle-50-30-20.service";

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

  constructor(
    private utilService: UtilService,
    private bottomSheet: MatBottomSheet,
    public fb: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,
    private storageService: StorageService,
    private apiService: ApiService,
    private controle503020Service: Controle503020Service,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.mainForm();
  }

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
    if (this.storageService.getLocalStorageLancamentos().length > 0) {
      setTimeout(() => {
        this.atualizarContadorLancamentoDespesas();
      }, 3000);
    }

    this.controle503020Service.atualizarCarrinhoObservable().subscribe(() => {
      this.atualizarContadorLancamentoDespesas();
    });

    this.renda1.valueChanges.subscribe(() => {
      this.atualizarRendaTotal();
    });

    this.renda2.valueChanges.subscribe(() => {
      this.atualizarRendaTotal();
    });
  }

  mainForm() {
    this.formGroup = this.fb.group({
      secretCode: ["123", [Validators.required]],
      renda1: [null, [Validators.required]],
      renda2: [null, [Validators.required]],
      tipoDespesa: [""],
      nomeDespesa: [""],
      descricaoDespesa: ["", [Validators.required]],
      obsDespesa: ["", [Validators.required]],
      valorDespesa: [null, [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
    });
  }

  selecionarMes(mes) {
    this.selectedMonthDesc = mes;
  }

  atualizarRendaTotal() {
    this.rendaTotal = Number(this.renda1.value) + Number(this.renda2.value);
    this.atualizarGraficoIdeal(this.rendaTotal);
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
    user.id = 0;
    user.codigo = "";
    user.email = "";
    user.lancamentos = [];
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  adicionarDespesa() {
    if (this.valorDespesa.value < 1) {
      this.openSnackBar("Ops...", "Preencha o valor da despesa!");
      return;
    }

    let lancamentos = this.storageService.getLocalStorageLancamentos() as Lancamento[];
    let despesa = null;
    let lancamento = null;

    Array.from(lancamentos).forEach((lan) => {
      if (String(lan.mes) === String(this.selectedMonthDesc)) {
        lancamento = lan;
      }
    });

    console.log("lancamento", lancamento);

    if (lancamento == null) {
      lancamento = new Lancamento();
      lancamento.mes = this.selectedMonthDesc;
      lancamento.despesas = [];
    }

    despesa = lancamento.despesas
      ? lancamento.despesas.find(
          (despesa) => String(despesa.tipo) === String(this.tipoDespesa.value)
        )
      : null;

    console.log("tipoDespesa", this.tipoDespesa.value);

    if (despesa == null) {
      despesa = new Despesa();
      despesa.tipo = this.tipoDespesa.value;
      despesa.name = this.nomeDespesa.value;
    }

    let itemDespesa = new DespesaItem();
    itemDespesa.desc = this.descricaoDespesa.value;
    itemDespesa.obs = this.obsDespesa.value;
    itemDespesa.valor = this.valorDespesa.value;

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    despesa.itensDespesa.push(itemDespesa);

    let tipoDespesaAtual = false;

    Array.from(lancamento.despesas as Despesa[]).forEach((desp) => {
      if (desp.tipo === String(this.tipoDespesa.value)) {
        desp = despesa;
        tipoDespesaAtual = true;
      }
    });

    if (!tipoDespesaAtual || lancamento.despesas.length === 0) {
      lancamento.despesas.push(despesa);
    }

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    let mesAtual = false;

    Array.from(lancamentos as Lancamento[]).forEach((lan) => {
      if (lan.mes === lancamento.mes) {
        lan = lancamento;
        mesAtual = true;
      }
    });
    if (!mesAtual || lancamentos.length === 0) {
      lancamentos.push(lancamento);
    }

    this.storageService.setLocalStorageLancamentos(lancamentos);

    console.log(this.storageService.getLocalStorageLancamentos());
    console.log("lancamentos", lancamentos);
    this.apiService.salvar(lancamentos);

    if (lancamento.despesas.length > 0) {
      this.atualizarContadorLancamentoDespesas();

      this.descricaoDespesa.reset();
      this.valorDespesa.reset();
      this.obsDespesa.reset();
    }
  }

  atualizarContadorLancamentoDespesas() {
    var cont = 0;
    var lancamentos = this.storageService.getLocalStorageLancamentos();

    if (lancamentos.length > 0) {
      lancamentos.forEach((lancamento) => {
        lancamento.despesas.forEach((despesa) => {
          cont += despesa.itensDespesa.length;
        });
      });
    }

    this.contLancamentoDespesas = lancamentos.length === 0 ? 0 : cont;
    this.changeDetector.detectChanges();
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetCodigoSecretoComponent);
  }

  abrirGraficoDespesasBottomSheet() {
    this.bottomSheet.open(BottomSheetGraficoDespesasComponent);
  }

  abrirLancamentosDespesasMesBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetLancamentosDespesasComponent
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.atualizarContadorLancamentoDespesas();
    });
  }

  abrirComoFuncionaBottomSheet() {
    this.bottomSheet.open(BottomSheetComoFuncionaComponent, {
      panelClass: "bottom-sheet-style",
    });
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

    this.tabIndex = this.meses.findIndex(
      (mes) => String(mes) === String(this.currentMonth)
    );
  }

  selectedTabChange(mes: string) {
    this.selectedMonthDesc = mes;
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
    bottomSheefRef.afterDismissed().subscribe((response) => {
      if (response) {
        const bottomSheefNovaDespesaRef = this.bottomSheet.open(
          BottomSheetNovaDespesa,
          {
            data: {
              tipoDespesa: response.tipoDespesa,
              nomeDespesa: response.nomeDespesa,
              descricaoDespesa: response.despesa,
              mesSelecionado: this.selectedMonthDesc,
            },
          }
        );

        this.tipoDespesa.setValue(response.tipoDespesa);
        this.nomeDespesa.setValue(response.nomeDespesa);
        this.descricaoDespesa.setValue(response.despesa);
        this.obsDespesa.reset();
        this.valorDespesa.reset();

        setTimeout(() => {
          this.valorDespesaEl.nativeElement.focus();
        }, 100);

        bottomSheefNovaDespesaRef.afterDismissed().subscribe((response) => {
          if (response) {
            this.abrirBottomSheetDespesas();
          }
        });
      }
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

  get renda1(): FormControl {
    return this.formGroup.get("renda1") as FormControl;
  }

  get renda2(): FormControl {
    return this.formGroup.get("renda2") as FormControl;
  }

  get descricaoDespesa(): FormControl {
    return this.formGroup.get("descricaoDespesa") as FormControl;
  }

  get obsDespesa(): FormControl {
    return this.formGroup.get("obsDespesa") as FormControl;
  }

  get tipoDespesa(): FormControl {
    return this.formGroup.get("tipoDespesa") as FormControl;
  }

  get nomeDespesa(): FormControl {
    return this.formGroup.get("nomeDespesa") as FormControl;
  }

  get valorDespesa(): FormControl {
    return this.formGroup.get("valorDespesa") as FormControl;
  }
}
