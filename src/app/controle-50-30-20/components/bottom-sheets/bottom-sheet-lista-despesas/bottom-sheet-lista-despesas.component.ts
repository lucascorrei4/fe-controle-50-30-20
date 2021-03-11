import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Controle503020Service } from "../../../controle-50-30-20.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Category } from "src/app/models/category";
import { StorageService } from "src/app/services/storage.service";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "bottom-sheet-lista-despesas",
  templateUrl: "bottom-sheet-lista-despesas.component.html",
  styleUrls: ["bottom-sheet-lista-despesas.component.scss"],
})
export class BottomSheetListaDespesasComponent implements OnInit {
  public categoriesGrouped: any[] = [];
  public autoCompleteControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetListaDespesasComponent>,
    private controleService: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {
    this.filteredOptions = this.autoCompleteControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  ngOnInit() {
    if (
      !this.storageService.getLocalCategories() ||
      this.storageService.getLocalCategories()?.length === 0
    ) {
      this.getCategories();
    } else {
      this.categoriesGrouped = this.storageService.getLocalCategories();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoriesGrouped.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private async getCategories() {
    await this.controleService.getCategories().toPromise();
    this.categoriesGrouped = this.storageService.getLocalCategories();
  }

  select(event: MouseEvent, category: Category): void {
    this.openSnackBar("Você selecionou:", category.title);
    this.bottomSheetRef.dismiss(category);
    event.preventDefault();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getTypeDescription(type: string) {
    switch (type) {
      case "VARIAVEIS":
        return "SUPÉRFLUOS";
      case "INVESTIMENTOS":
        return "OBJETIVOS";
      default:
        return "ESSENCIAIS";
    }
  }
}
