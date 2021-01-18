import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  LOCALE_ID,
  Inject,
  NgZone,
  ViewEncapsulation,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { BottomSheetListaDespesasComponent } from "./components/bottom-sheets/bottom-sheet-lista-despesas/bottom-sheet-lista-despesas.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { formatDate } from "@angular/common";
import { User } from "../models/user";
import { ApiService } from "../services/api.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UtilService } from "../services/util.service";
import { BottomSheetGraficoDespesasComponent } from "./components/bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetComoFuncionaComponent } from "./components/bottom-sheets/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component";

import { StorageService } from "../services/storage.service";
import { Despesa } from "../models/despesa";
import { DespesaItem } from "../models/despesa-item";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Lancamento } from "../models/lancamento";
import { DespesaEnum } from "../enums/despesas-enum";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { BottomSheetNovaDespesa } from "./components/bottom-sheets/bottom-sheet-nova-despesa/bottom-sheet-nova-despesa.component";

import { Controle503020Service } from "./controle-50-30-20.service";
import { BottomSheetLoginComponent } from "./components/bottom-sheets/bottom-sheet-login/bottom-sheet-login.component";

@Component({
  selector: "app-controle-50-30-20",
  templateUrl: "./controle-50-30-20.component.html",
  styleUrls: ["./controle-50-30-20.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Controle503020Component implements OnInit {
  constructor(
    private storageService: StorageService,
    private bottomSheet: MatBottomSheet,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.verifyLoggedUser();
  }

  verifyLoggedUser() {
    if (
      this.utilService.objectIsNullUndefinedOrEmpty(
        this.storageService.getLocalUser()
      )
    ) {
      this.openLogin();
    }
  }

  openLogin() {
    const bottomSheefNovaDespesaRef = this.bottomSheet.open(
      BottomSheetLoginComponent,
      {
        disableClose: true,
      }
    );
    bottomSheefNovaDespesaRef.afterDismissed().subscribe((response) => {
      if (response) {
      }
    });
  }
}
