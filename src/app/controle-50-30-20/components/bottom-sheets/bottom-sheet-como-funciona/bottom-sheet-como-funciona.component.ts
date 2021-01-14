import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "bottom-sheet-como-funciona",
  templateUrl: "bottom-sheet-como-funciona.component.html",
  styleUrls: ["bottom-sheet-como-funciona.component.scss"],
})
export class BottomSheetComoFuncionaComponent {
  public despesas: any;

  public STR_GASTOS_50 =
    "Tudo o que você gasta de forma rotineira: moradia, aluguél, contas de energia, água e internet, alimentação, transporte, saúde, mercado, educação, seguros e doações.";
  public STR_GASTOS_30 =
    "Tudo o que você gasta de forma variável sem prioridade: despesas pessoais para entretenimento como idas ao cinema, salão de beleza, bares e restaurantes, viagens, academias, compras e cuidados pessoais...";
  public STR_GASTOS_20 =
    "Valor que você precisa poupar todo mês pensando no futuro: fundo para emergências, contratar um plano de previdência privada, fazer investimentos de longo prazo, poupança e etc...";

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComoFuncionaComponent>,
    private snackBar: MatSnackBar
  ) {}

  enviarCodigoSecreto(): void {
    this.bottomSheetRef.dismiss();
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
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
}
