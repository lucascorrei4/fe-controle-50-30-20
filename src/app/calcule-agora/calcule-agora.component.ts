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

enum DespesaEnum {
  Fixa,
  Lifestyle,
  Investimento
}

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

  public selectedMonth: string;
  public selectedMonthDesc: string;
  public msgAdicionarDespesas: string = "Selecione nova despesa";

  public formGroup: FormGroup;

  submitted = false;

  single: any[];
  view: any[] = [500, 400];

  showLegend: boolean = true;
  showLabels: boolean = true;

  despesaEnum: DespesaEnum = DespesaEnum.Fixa;

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
    this.lastMonth = formatDate(this.today.setMonth(this.today.getMonth() - 1), 'MM/yyyy', this.locale);
    this.currentMonth = formatDate(new Date(), 'MM/yyyy', this.locale);
    this.nextMonth = formatDate(new Date().setMonth(new Date().getMonth() + 1), 'MM/yyyy', this.locale);
    this.mainForm();

    Object.assign(this, { single });

    setTimeout(() => {
      this.atualizarContadorLancamentoDespesas();
    }, 3000);
  }

  ngOnInit() {
    this.selectedMonth = 'currentMonth';
    this.selectedMonthDesc = this.currentMonth;
    this.initObservers();
  }

  mainForm() {
    this.formGroup = this.fb.group({
      secretCode: ["123", [Validators.required]],
      renda1: [null, [Validators.required]],
      renda2: [null, [Validators.required]],
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
        name: 'Lifestyle Ideal',
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
    console.log(this.formGroup)
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

  onMonthChange(val) {
    this.selectedMonth = val.value;
    switch (val.value) {
      case 'lastMonth':
        this.selectedMonthDesc = this.lastMonth;
        break;
      case 'nextMonth':
        this.selectedMonthDesc = this.nextMonth;
        break;
      default:
        this.selectedMonthDesc = this.currentMonth;
        break;
    }
  }

  public enviarLancamento() {
    var user = new User();
    user.id = 0;
    user.codigo = "";
    user.email = "";
    user.lancamentos = [];
    this.apiService.salvar(user);
  }

  public onValChange(val: string) {
    this.selectedMonth = val;
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  openBottomSheet(): void {
    const bottomSheefRef = this.bottomSheet.open(BottomSheetDespesasComponent);
    bottomSheefRef.afterDismissed().subscribe((response) => {
      this.descricaoDespesa.setValue(response);
      this.valorDespesa.reset();
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

    var despesa = null;

    if (this.storageService.getLocalDespesa().itensDespesa) {
      despesa = this.storageService.getLocalDespesa();
    } else {
      despesa = new Despesa;
      despesa.id = 0;
      despesa.name = this.descricaoDespesa.value;
      despesa.tipo = this.descricaoDespesa.value === DespesaEnum.Fixa.toString()
        ? DespesaEnum.Lifestyle.toString() : DespesaEnum.Investimento.toString();
      despesa.itensDespesa = [];
    }

    const itemDespesa = new DespesaItem;
    itemDespesa.desc = this.descricaoDespesa.value;
    itemDespesa.valor = this.valorDespesa.value;

    despesa.itensDespesa.push(itemDespesa);

    this.storageService.setLocalDespesa(despesa);
    console.log(this.storageService.getLocalDespesa());

    this.atualizarContadorLancamentoDespesas();

    this.msgAdicionarDespesas = "Despesa '" + this.descricaoDespesa.value + "' criada!";

    setTimeout(() => {
      this.msgAdicionarDespesas = "Selecione nova despesa";
    }, 3000);

    this.descricaoDespesa.reset();
    this.valorDespesa.reset();
  }

  atualizarContadorLancamentoDespesas() {
    this.contLancamentoDespesas = this.storageService.getLocalDespesa().itensDespesa ? this.storageService.getLocalDespesa().itensDespesa.length : 0;
    this.changeDetector.detectChanges();
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetCodigoSecretoComponent);
  }

  abrirGraficoDespesasBottomSheet() {
    this.bottomSheet.open(BottomSheetGraficoDespesasComponent);
  }

  abrirLancamentosDespesasMesBottomSheet() {
    this.bottomSheet.open(BottomSheetLancamentosDespesasComponent);
  }

  abrirComoFuncionaBottomSheet() {
    this.bottomSheet.open(BottomSheetComoFuncionaComponent);
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

  get valorDespesa(): FormControl {
    return this.formGroup.get('valorDespesa') as FormControl;
  }
}
