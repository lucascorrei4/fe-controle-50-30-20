import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Controle503020Service } from "../../../controle-50-30-20.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Category } from "src/app/models/category";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "bottom-sheet-lista-despesas",
  templateUrl: "bottom-sheet-lista-despesas.component.html",
})
export class BottomSheetListaDespesasComponent implements OnInit {
  public categoriesGrouped: any[] = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetListaDespesasComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.storageService.getLocalCategories().length === 0) {
      this.getCategories();
    } else {
      this.categoriesGrouped = this.storageService.getLocalCategories();
    }
  }

  private async getCategories() {
    await this.controle503020Service.getCategories().toPromise();
    this.categoriesGrouped = this.storageService.getLocalCategories();
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
