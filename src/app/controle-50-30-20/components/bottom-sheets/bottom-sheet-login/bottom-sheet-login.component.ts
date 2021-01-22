import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-login",
  templateUrl: "bottom-sheet-login.component.html",
})
export class BottomSheetLoginComponent {
  public despesas: any;
  public email = new FormControl();
  public loggedUser: User = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetLoginComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService
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

  login() {
    if (this.email.value) {
      this.controle503020Service.findUserByEmail(this.email.value).subscribe(
        (res) => {
          if (res) {
            this.fechar();
          } else {
            this.openSnackBar("OOPS", "Não autorizado!");
          }
        },
        (err) => {
          console.error(err);
          this.openSnackBar("OOPS", "Não autorizado!");
        }
      );
    } else {
      this.openSnackBar("Oops", "Informe o seu e-mail");
    }
  }

  newUser() {}
}
