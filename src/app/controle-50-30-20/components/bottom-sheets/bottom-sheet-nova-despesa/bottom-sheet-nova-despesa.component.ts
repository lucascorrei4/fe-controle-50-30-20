import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatHorizontalStepper } from "@angular/material/stepper";
import { BehaviorSubject, Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "src/app/services/api.service";
import { StorageService } from "src/app/services/storage.service";
import { Lancamento } from "src/app/models/lancamento";
import { Despesa } from "src/app/models/despesa";
import { DespesaItem } from "src/app/models/despesa-item";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "app-bottom-sheet-nova-despesa",
  templateUrl: "./bottom-sheet-nova-despesa.component.html",
  styleUrls: ["./bottom-sheet-nova-despesa.component.scss"],
})
export class BottomSheetNovaDespesa implements OnInit {
  @ViewChild("stepper", { read: true, static: true })
  stepper: MatHorizontalStepper;
  formGroup: FormGroup;
  private _isComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetNovaDespesa>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private storageService: StorageService,
    private controle503020Service: Controle503020Service
  ) {
    this.initForm();
    console.log(this.data);
  }

  ngOnInit() {}

  initForm() {
    this.formGroup = this.fb.group({
      tipoDespesa: [this.data.tipoDespesa],
      nomeDespesa: [this.data.nomeDespesa],
      descricaoDespesa: [this.data.descricaoDespesa, Validators.required],
      obsDespesa: [""],
      valorDespesa: [0, Validators.required],
    });
  }

  fechar() {
    this.bottomSheetRef.dismiss();
  }

  changeStepper(event) {
    console.log(event);
  }

  adicionarDespesa() {
    if (this.valorDespesa.value < 1) {
      this.openSnackBar("Ops...", "Preencha o valor da despesa!");
      return;
    }

    let lancamentos = this.storageService.getLocalStorageLancamentos() as Lancamento[];
    let despesa = null;
    let lancamento = null;

    Array.from(lancamentos).forEach((lan) => {
      if (String(lan.mes) === String(this.data.mesSelecionado)) {
        lancamento = lan;
      }
    });

    console.log("lancamento", lancamento);

    if (lancamento == null) {
      lancamento = new Lancamento();
      lancamento.mes = this.data.mesSelecionado;
      lancamento.despesas = [];
    }

    despesa = lancamento.despesas
      ? lancamento.despesas.find(
          (despesa) => String(despesa.tipo) === String(this.tipoDespesa.value)
        )
      : null;

    console.log("tipoDespesa", this.tipoDespesa.value);

    if (despesa == null) {
      despesa = new Despesa();
      despesa.tipo = this.tipoDespesa.value;
      despesa.name = this.nomeDespesa.value;
    }

    let itemDespesa = new DespesaItem();
    itemDespesa.desc = this.descricaoDespesa.value;
    itemDespesa.obs = this.obsDespesa.value;
    itemDespesa.valor = this.valorDespesa.value;

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    despesa.itensDespesa.push(itemDespesa);

    let tipoDespesaAtual = false;

    Array.from(lancamento.despesas as Despesa[]).forEach((desp) => {
      if (desp.tipo === String(this.tipoDespesa.value)) {
        desp = despesa;
        tipoDespesaAtual = true;
      }
    });

    if (!tipoDespesaAtual || lancamento.despesas.length === 0) {
      lancamento.despesas.push(despesa);
    }

    despesa.itensDespesa = despesa.itensDespesa ? despesa.itensDespesa : [];

    let mesAtual = false;

    Array.from(lancamentos as Lancamento[]).forEach((lan) => {
      if (lan.mes === lancamento.mes) {
        lan = lancamento;
        mesAtual = true;
      }
    });
    if (!mesAtual || lancamentos.length === 0) {
      lancamentos.push(lancamento);
    }

    this.storageService.setLocalStorageLancamentos(lancamentos);

    console.log(this.storageService.getLocalStorageLancamentos());
    console.log("lancamentos", lancamentos);
    this.apiService.salvar(lancamentos);

    if (lancamento.despesas.length > 0) {
      this.controle503020Service.atualizarCarrinho();

      this.descricaoDespesa.reset();
      this.valorDespesa.reset();
      this.obsDespesa.reset();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  novaDespesa() {
    this.bottomSheetRef.dismiss(true);
  }

  getValorDespesa(): number {
    return Number(this.valorDespesa.value);
  }

  get descricaoDespesa(): FormControl {
    return this.formGroup.get("descricaoDespesa") as FormControl;
  }

  get obsDespesa(): FormControl {
    return this.formGroup.get("obsDespesa") as FormControl;
  }

  get tipoDespesa(): FormControl {
    return this.formGroup.get("tipoDespesa") as FormControl;
  }

  get nomeDespesa(): FormControl {
    return this.formGroup.get("nomeDespesa") as FormControl;
  }

  get valorDespesa(): FormControl {
    return this.formGroup.get("valorDespesa") as FormControl;
  }

  get isComplete$(): Observable<boolean> {
    return this._isComplete.asObservable();
  }
}
