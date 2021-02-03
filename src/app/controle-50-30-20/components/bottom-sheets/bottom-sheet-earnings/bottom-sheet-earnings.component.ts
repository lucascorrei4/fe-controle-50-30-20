import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatHorizontalStepper } from "@angular/material";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Earning } from "src/app/models/earning";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-earnings",
  templateUrl: "bottom-sheet-earnings.component.html",
  styleUrls: ["bottom-sheet-earnings.component.scss"],
})
export class BottomSheetEarningsComponent {
  @ViewChild("stepper", { read: true, static: true })
  public stepper: MatHorizontalStepper;
  public despesas: any;
  public email = new FormControl();
  public loggedUser: User = null;
  public formGroup: FormGroup;
  public selectedMonth: string = null;
  public totalEarnings: number = 0;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetEarningsComponent>,
    private controleService: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    public fb: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) {
    this.loggedUser = this.storageService.getLocalUser();
    this.controleService.selectedMonth$.subscribe(
      (res) => (this.selectedMonth = res)
    );
    this.initForm();
  }

  initObservers() {
    this.renda1.valueChanges.subscribe(() => {
      this.updateTotalEarnings();
    });

    this.renda2.valueChanges.subscribe(() => {
      this.updateTotalEarnings();
    });

    this.rendaExtra.valueChanges.subscribe(() => {
      this.updateTotalEarnings();
    });
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      renda1: [0, [Validators.required]],
      renda2: [0, [Validators.required]],
      rendaExtra: [0, [Validators.required]],
    });
    this.initObservers();
    this.verifyEarningRef();
  }

  async verifyEarningRef() {
    let launch = await this.controleService
      .findEarningByUserIdAndRef(this.loggedUser._id, this.selectedMonth)
      .toPromise();

    if (launch) {
      this.renda1.setValue(launch.renda1);
      this.renda2.setValue(launch.renda2);
      this.rendaExtra.setValue(launch.rendaExtra);
      this.updateTotalEarnings();
      this.changeDetection.detectChanges();
    }
  }

  saveEarnings() {
    if (this.totalEarnings === 0) {
      this.openSnackBar("Ooops", "Informe pelo menos uma renda!");
      return;
    }
    let earning = new Earning();
    earning.userId = this.loggedUser._id;
    earning.ref = this.selectedMonth;
    earning.renda1 = this.renda1.value;
    earning.renda2 = this.renda2.value;
    earning.rendaExtra = this.rendaExtra.value;
    this.controleService.newEarning(earning).subscribe((res) => {
      if (res) {
        this.openSnackBar(
          "Sucesso",
          `Renda do mês ${this.selectedMonth} salva!`
        );
        this.close();
      }
    });
  }

  updateTotalEarnings() {
    this.totalEarnings =
      Number(this.renda1.value ?? 0) +
      Number(this.renda2.value ?? 0) +
      Number(this.rendaExtra.value ?? 0);
    this.controleService.monthEarning.next(this.totalEarnings);
  }

  get renda1(): FormControl {
    return this.formGroup.get("renda1") as FormControl;
  }

  get renda2(): FormControl {
    return this.formGroup.get("renda2") as FormControl;
  }

  get rendaExtra(): FormControl {
    return this.formGroup.get("rendaExtra") as FormControl;
  }
}
