import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-login",
  templateUrl: "bottom-sheet-login.component.html",
})
export class BottomSheetLoginComponent {
  public despesas: any;
  public email = new FormControl();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetLoginComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar
  ) {}

  fechar(): void {
    this.bottomSheetRef.dismiss();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login() {
    console.log(this.email.value);

    if (this.email.value) {
      this.controle503020Service.findUserByEmail(this.email.value).subscribe(
        (res) => {
          if (res) {
            this.fechar();
          } else {
            this.openSnackBar("OOPS", "Não autorizado!");
          }
          console.log(res);
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
}
