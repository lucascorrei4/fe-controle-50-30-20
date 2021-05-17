import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Controle503020Service } from "../../../controle-50-30-20.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "bottom-sheet-grafico-despesas",
  templateUrl: "bottom-sheet-grafico-despesas.component.html",
  styleUrls: ["bottom-sheet-grafico-despesas.component.scss"],
})
export class BottomSheetGraficoDespesasComponent {
  public despesas: any;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetGraficoDespesasComponent>,
    private snackBar: MatSnackBar,
    private controleService: Controle503020Service
  ) {}

  enviarCodigoSecreto(): void {
    this.bottomSheetRef.dismiss();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
