import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject, NgZone } from '@angular/core';
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

@Component({
  selector: 'app-calcule-agora',
  templateUrl: './calcule-agora.component.html',
  styleUrls: ['./calcule-agora.component.scss']
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

  public today = new Date();

  public selectedMonth: string;
  public selectedMonthDesc: string;

  public formGroup: FormGroup;

  submitted = false;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    @Inject(LOCALE_ID) private locale: string,
    private apiService: ApiService,
    private utilService: UtilService
  ) {
    this.lastMonth = formatDate(this.today.setMonth(this.today.getMonth() - 1), 'MM/yyyy', this.locale);
    this.currentMonth = formatDate(new Date(), 'MM/yyyy', this.locale);
    this.nextMonth = formatDate(new Date().setMonth(new Date().getMonth() + 1), 'MM/yyyy', this.locale);
    this.mainForm();
  }

  ngOnInit() {
    this.selectedMonth = 'currentMonth';
    this.selectedMonthDesc = this.currentMonth;
    this.initObservers();
  }

  mainForm() {
    this.formGroup = this.fb.group({
      secretCode: ["123", [Validators.required]],
      renda1: [0, [Validators.required]],
      renda2: [0, [Validators.required]],
      descricaoDespesa: ['', [Validators.required]],
      valorDespesa: [0, [Validators.required]],
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
    bottomSheefRef.afterDismissed().subscribe((response) => this.descricaoDespesa.setValue(response));
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetCodigoSecretoComponent);
  }

  getFormattedPrice(price: number) {
    return this.utilService.getFormattedPrice(price).substring(3);
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
