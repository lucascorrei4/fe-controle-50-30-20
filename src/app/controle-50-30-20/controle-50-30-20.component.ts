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
import { BottomSheetCodigoSecretoComponent } from "./components/bottom-sheets/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component";
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
import { BottomSheetLancamentosDespesasComponent } from "./components/bottom-sheets/bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component";
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

@Component({
  selector: "app-controle-50-30-20",
  templateUrl: "./controle-50-30-20.component.html",
  styleUrls: ["./controle-50-30-20.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Controle503020Component implements OnInit {
  @ViewChild("tooltip", { static: true }) matTooltip: MatTooltip;

  submitted = false;

  showLegend: boolean = true;
  showLabels: boolean = true;

  despesaEnum: DespesaEnum = DespesaEnum.Fixas;

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  };

  constructor(
    public fb: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {}
}
