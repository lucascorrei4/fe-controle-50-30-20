import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { CalculeAgoraService } from './calcule-agora.service';
import { BottomSheetDespesasComponent } from './bottom-sheet-despesas/bottom-sheet-despesas.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

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

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  scroll() {
    this.calculeAgoraDiv.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetDespesasComponent);
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
