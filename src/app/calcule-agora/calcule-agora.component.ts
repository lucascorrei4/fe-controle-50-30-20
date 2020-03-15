import { Component, OnInit, ElementRef, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { BottomSheetDespesasComponent } from './bottom-sheet-despesas/bottom-sheet-despesas.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { formatDate } from '@angular/common';
import { BottomSheetCodigoSecretoComponent } from './bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component';

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

  public today = new Date();

  public selectedMonth: string;
  public selectedMonthDesc: string;


  constructor(private bottomSheet: MatBottomSheet, @Inject(LOCALE_ID) private locale: string) {
    this.lastMonth = formatDate(this.today.setMonth(this.today.getMonth() - 1), 'MM/yyyy', this.locale);
    this.currentMonth = formatDate(new Date(), 'MM/yyyy', this.locale);
    this.nextMonth = formatDate(new Date().setMonth(new Date().getMonth() + 1), 'MM/yyyy', this.locale);
  }

  ngOnInit() {
    this.selectedMonth = 'currentMonth';
    this.selectedMonthDesc = this.currentMonth;
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

  public onValChange(val: string) {
    this.selectedMonth = val;
  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetDespesasComponent);
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetCodigoSecretoComponent);
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
