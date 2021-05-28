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
import { Controle503020Service } from "../../../controle-50-30-20.service";
import { Launch } from "src/app/models/launch";
import { Category } from "src/app/models/category";
import { RepeatedLaunch } from "src/app/models/repeated-launch";

@Component({
  selector: "app-bottom-sheet-nova-despesa",
  templateUrl: "./bottom-sheet-nova-despesa.component.html",
  styleUrls: ["./bottom-sheet-nova-despesa.component.scss"],
})
export class BottomSheetNovaDespesa implements OnInit {
  @ViewChild("stepper", { read: true, static: true })
  public stepper: MatHorizontalStepper;
  public formGroup: FormGroup;
  public launch: Launch = null;
  public selectedMonth: string = null;
  public category: Category = null;

  private _isComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetNovaDespesa>,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private controleService: Controle503020Service
  ) {
    this.category = data.category;
    this.controleService.selectedMonth$.subscribe(
      (res) => (this.selectedMonth = res)
    );
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      tipoDespesa: [this.category.type],
      nomeDespesa: [this.category.title],
      descricaoDespesa: ["", Validators.required],
      obsDespesa: [""],
      valorDespesa: [0, Validators.required],
      repeat: [false],
    });
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  saveLaunch() {
    if (this.valorDespesa.value < 1) {
      this.openSnackBar("Ops...", "Preencha o valor da despesa!");
      return;
    }
    let launch = new Launch();
    launch.userId = this.storageService.getLocalUser()._id;
    launch.accountId = this.storageService.getLocalUser().accountId;
    launch.description = this.category.title;
    launch.month = this.selectedMonth;
    launch.type = this.category.type;
    launch.categoryId = this.category.categoryId;
    launch.valor = this.valorDespesa.value;
    launch.obs = this.obsDespesa.value;
    this.controleService.newLaunch(launch).subscribe((res) => {
      if (res) {
        if (this.repeat.value) {
          this.saveRepeatedLaunch(res);
        }
        this.controleService.updateBadges();
        this.descricaoDespesa.reset();
        this.valorDespesa.reset();
        this.obsDespesa.reset();
      }
    });
  }

  private saveRepeatedLaunch(launch: Launch) {
    let repeatedLaunch = new RepeatedLaunch();
    repeatedLaunch.userId = this.storageService.getLocalUser()._id;
    repeatedLaunch.accountId = this.storageService.getLocalUser().accountId;
    repeatedLaunch.description = launch.description;
    repeatedLaunch.type = launch.type;
    repeatedLaunch.categoryId = launch.categoryId;
    repeatedLaunch.valor = launch.valor;
    repeatedLaunch.obs = "NENHUMA";
    this.controleService.newRepeatedLaunch(repeatedLaunch).subscribe((res) => {
      if (res) {
        this.controleService.updateBadges();
        this.descricaoDespesa.reset();
        this.valorDespesa.reset();
        this.obsDespesa.reset();
      }
    });
  }

  repeatLaunch(event) {
    this.repeat.setValue(event.checked);
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

  get repeat(): FormControl {
    return this.formGroup.get("repeat") as FormControl;
  }

  get isComplete$(): Observable<boolean> {
    return this._isComplete.asObservable();
  }
}
