import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, NgZone, ViewEncapsulation, HostListener, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { BottomSheetDespesasComponent } from './bottom-sheet-despesas/bottom-sheet-despesas.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { formatDate } from '@angular/common';
import { BottomSheetCodigoSecretoComponent } from './bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { BottomSheetGraficoDespesasComponent } from './bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component';
import { BottomSheetLancamentosDespesasComponent } from './bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component';
import { BottomSheetComoFuncionaComponent } from './bottom-sheet-como-funciona/bottom-sheet-como-funciona.component';
import { single } from './../charts.data';
import { StorageService } from '../services/storage.service';
import { Despesa } from '../models/despesa';
import { DespesaItem } from '../models/despesa-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lancamento } from '../models/lancamento';
import { DespesaEnum } from '../enums/despesas-enum';


@Component({
  selector: 'app-calcule-agora',
  templateUrl: './calcule-agora.component.html',
  styleUrls: ['./calcule-agora.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculeAgoraComponent implements OnInit {

  @ViewChild('tooltip', { static: true }) matTooltip: MatTooltip;
  @ViewChild('calculeAgora', { static: true }) calculeAgoraDiv: ElementRef;

  public STR_GASTOS_50 = 'Tudo o que você gasta de forma rotineira: moradia, aluguél, contas de energia, água e internet, alimentação, transporte, saúde, mercado, educação, seguros e doações.';
  public STR_GASTOS_30 = 'Tudo o que você gasta de forma variável sem prioridade: despesas pessoais para entretenimento como idas ao cinema, salão de beleza, bares e restaurantes, viagens, academias, compras e cuidados pessoais...';
  public STR_GASTOS_20 = 'Valor que você precisa poupar todo mês pensando no futuro: fundo para emergências, contratar um plano de previdência privada, fazer investimentos de longo prazo, poupança e etc...'

  public currentMonth: any;
  public lastMonth: any;
  public nextMonth: any;

  public rendaTotal: number = 0;
  public contLancamentoDespesas: number = 0;

  public today = new Date();

  public selectedMonthDesc: string;
  public msgAdicionarDespesas: string = "Selecione nova despesa";

  public formGroup: FormGroup;

  submitted = false;

  single: any[];
  view: any[] = [500, 400];
  meses: any[] = [];

  showLegend: boolean = true;
  showLabels: boolean = true;

  despesaEnum: DespesaEnum = DespesaEnum.Fixas;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    @Inject(LOCALE_ID) private locale: string,
    private apiService: ApiService,
    private utilService: UtilService,
    private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {

    this.carregarMeses();

    this.mainForm();

    Object.assign(this, { single });

    if (this.storageService.getLocalStorageLancamentos().length > 0) {
      setTimeout(() => {
        this.atualizarContadorLancamentoDespesas();
      }, 3000);
    }

  }

  ngOnInit() {
    this.initObservers();
  }

  carregarMeses() {
    this.lastMonth = formatDate(this.today.setMonth(this.today.getMonth() - 1), 'MM/yyyy', this.locale);
    this.currentMonth = formatDate(new Date(), 'MM/yyyy', this.locale);
    this.nextMonth = formatDate(new Date().setMonth(new Date().getMonth() + 1), 'MM/yyyy', this.locale);

    this.meses.push(this.lastMonth, this.currentMonth, this.nextMonth);

    this.selectedMonthDesc = this.currentMonth;
  }

  mainForm() {
    this.formGroup = this.fb.group({
      secretCode: ["123", [Validators.required]],
      renda1: [null, [Validators.required]],
      renda2: [null, [Validators.required]],
      tipoDespesa: [''],
      nomeDespesa: [''],
      descricaoDespesa: ['', [Validators.required]],
      valorDespesa: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  initObservers() {

    this.renda1.valueChanges.subscribe(() => {
      this.atualizarRendaTotal();
    });

    this.renda2.valueChanges.subscribe(() => {
      this.atualizarRendaTotal();
    });

  }

  atualizarRendaTotal() {
    this.rendaTotal = Number(this.renda1.value) + Number(this.renda2.value);
    this.atualizarGraficoIdeal(this.rendaTotal);
  }

  private atualizarGraficoIdeal(rendaTotal: number) {
    this.single = [
      {
        name: 'Fixo Ideal',
        value: rendaTotal * 0.5
      },
      {
        name: 'Variáveis Ideal',
        value: rendaTotal * 0.3
      },
      {
        name: 'Invest. Ideal',
        value: rendaTotal * 0.2
      }
    ];
  }

  updateForm(e) {
    this.formGroup.get('renda1').setValue(e);
    this.formGroup.get('renda2').setValue(e);
  }

  onSubmit() {
    this.submitted = true;

    if (!this.formGroup.valid) {
      return false;
    } else {
      this.apiService.createUser(this.formGroup.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 500];
  }

  // Getter to access form control
  get formControls() {
    return this.formGroup.controls;
  }

  selecionarMes(mes) {
    this.selectedMonthDesc = mes;
  }

  public enviarLancamento() {
    var user = new User();
    user.id = 0;
    user.codigo = "";
    user.email = "";
    user.lancamentos = [];
    this.apiService.salvar(user);
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  openBottomSheet(): void {
    const bottomSheefRef = this.bottomSheet.open(BottomSheetDespesasComponent);
    bottomSheefRef.afterDismissed().subscribe((response) => {
      if (response) {
        this.tipoDespesa.setValue(response.tipoDespesa);
        this.nomeDespesa.setValue(response.nomeDespesa);
        this.descricaoDespesa.setValue(response.despesa);
        this.valorDespesa.reset();
      }
    });
  }

  adicionarDespesa() {

    if (!this.descricaoDespesa.value) {
      this.openSnackBar('Ops...', "Clique em 'Selecionar Despesa'!")
      return;
    }

    if (this.valorDespesa.value < 1) {
      this.openSnackBar('Ops...', "Preencha o valor da despesa!")
      return;
    }

    let lancamentos = this.storageService.getLocalStorageLancamentos() as Lancamento[];
    let despesa = null;
    let lancamento = null;

    Array.from(lancamentos).forEach(lan => {
      if (String(lan.mes) === String(this.selectedMonthDesc)) {
        lancamento = lan;
      }
    });

    console.log("lancamento", lancamento)

    if (lancamento == null) {
      lancamento = new Lancamento;
      lancamento.mes = this.selectedMonthDesc;
      lancamento.despesas = [];
    }

    despesa = lancamento.despesas ? lancamento.despesas.find(despesa => String(despesa.tipo) === String(this.tipoDespesa.value)) : null;

    console.log("tipoDespesa", this.tipoDespesa.value)

    if (despesa == null) {
      despesa = new Despesa;
      despesa.tipo = this.tipoDespesa.value;
      despesa.name = this.nomeDespesa.value;
    }

    let itemDespesa = new DespesaItem;
    itemDespesa.desc = this.descricaoDespesa.value;
    itemDespesa.valor = this.valorDespesa.value;

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    despesa.itensDespesa.push(itemDespesa);

    let tipoDespesaAtual = false;

    Array.from(lancamento.despesas as Despesa[]).forEach(desp => {
      if (desp.tipo === String(this.tipoDespesa.value)) {
        desp = despesa;
        tipoDespesaAtual = true;
      }
    });

    if (!tipoDespesaAtual || lancamento.despesas.length === 0) {
      lancamento.despesas.push(despesa);
    }

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    console.log("despesa.itensDespesa", despesa.itensDespesa)

    let mesAtual = false;

    Array.from(lancamentos as Lancamento[]).forEach(lan => {
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

    if (lancamento.despesas.length > 0) {

      this.atualizarContadorLancamentoDespesas();

      this.msgAdicionarDespesas = "Despesa '" + this.descricaoDespesa.value + "' criada!";

      setTimeout(() => {
        this.msgAdicionarDespesas = "Selecione nova despesa";
      }, 3000);

      this.descricaoDespesa.reset();
      this.valorDespesa.reset();

    }
  }

  atualizarContadorLancamentoDespesas() {
    var cont = 0;
    var lancamentos = this.storageService.getLocalStorageLancamentos();

    if (lancamentos.length > 0) {
      lancamentos.forEach(lancamento => {
        lancamento.despesas.forEach(despesa => {
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
    const bottomSheetRef = this.bottomSheet.open(BottomSheetLancamentosDespesasComponent);

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.atualizarContadorLancamentoDespesas();
    });
  }

  abrirComoFuncionaBottomSheet() {
    this.bottomSheet.open(BottomSheetComoFuncionaComponent, {
      panelClass: 'bottom-sheet-style'
    });

  }

  getFormattedPrice(price: number) {
    return this.utilService.getFormattedPrice(price).substring(3);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
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
    return this.formGroup.get('renda1') as FormControl;
  }

  get renda2(): FormControl {
    return this.formGroup.get('renda2') as FormControl;
  }

  get descricaoDespesa(): FormControl {
    return this.formGroup.get('descricaoDespesa') as FormControl;
  }

  get tipoDespesa(): FormControl {
    return this.formGroup.get('tipoDespesa') as FormControl;
  }

  get nomeDespesa(): FormControl {
    return this.formGroup.get('nomeDespesa') as FormControl;
  }

  get valorDespesa(): FormControl {
    return this.formGroup.get('valorDespesa') as FormControl;
  }
}
