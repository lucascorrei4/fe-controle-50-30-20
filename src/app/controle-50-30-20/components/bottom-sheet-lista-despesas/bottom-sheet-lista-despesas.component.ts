import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Controle503020Service } from "../../controle-50-30-20.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "bottom-sheet-lista-despesas",
  templateUrl: "bottom-sheet-lista-despesas.component.html",
})
export class BottomSheetListaDespesasComponent {
  public despesas: any;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetListaDespesasComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar
  ) {
    this.despesas = this.controle503020Service.gastos();
  }

  select(event: MouseEvent, tipo: string, nome: string, subItem: string): void {
    this.openSnackBar("Você selecionou:", subItem);
    this.bottomSheetRef.dismiss({
      tipoDespesa: tipo,
      nomeDespesa: nome,
      despesa: subItem,
    });
    event.preventDefault();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
