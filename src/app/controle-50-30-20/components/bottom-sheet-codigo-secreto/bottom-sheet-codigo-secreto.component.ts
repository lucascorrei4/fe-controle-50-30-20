import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Controle503020Service } from "../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-codigo-secreto",
  templateUrl: "bottom-sheet-codigo-secreto.component.html",
})
export class BottomSheetCodigoSecretoComponent {
  public despesas: any;
  public email = new FormControl();

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetCodigoSecretoComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar
  ) {}

  enviarCodigoSecreto(): void {
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
