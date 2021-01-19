import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-earnings",
  templateUrl: "bottom-sheet-earnings.component.html",
})
export class BottomSheetEarningsComponent {
  public despesas: any;
  public email = new FormControl();
  public loggedUser: User = null;
  public formGroup: FormGroup;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetEarningsComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    public fb: FormBuilder
  ) {
    this.loggedUser = this.storageService.getLocalUser();
  }

  fechar(): void {
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
  }

  saveEarnings() {}
}
