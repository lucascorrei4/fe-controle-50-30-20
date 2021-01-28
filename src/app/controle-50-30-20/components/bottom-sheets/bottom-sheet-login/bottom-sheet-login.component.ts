import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, shareReplay } from "rxjs/operators";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { UtilService } from "src/app/services/util.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-login",
  templateUrl: "bottom-sheet-login.component.html",
  styleUrls:['./bottom-sheet-login.component.scss']
})
export class BottomSheetLoginComponent implements OnInit {
  public despesas: any;
  public formGroup: FormGroup;

  public loggedUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public loggedUser$ = this.loggedUserSubject
    .asObservable()
    .pipe(distinctUntilChanged(), shareReplay());

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetLoginComponent>,
    private controle503020Service: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private utilService: UtilService,
    public fb: FormBuilder
  ) {
    let loggedUser = this.storageService.getLocalUser();
    this.loggedUserSubject.next(
      this.utilService.isEmpty(loggedUser?._id) ? null : loggedUser
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
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
            this.email.setValue(null);
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

  getErrorEmail(control: FormControl, label: string): string {
    if (control.hasError("email")) {
      return "Não corresponde a um email <strong>válido</strong>";
    }

    if (control.hasError("emailExiste")) {
      return "O email <strong>já está cadastrado</strong> no eBarn";
    }

    if (control.hasError("notEqual")) {
      return " Os emails informados não são <strong>iguais</strong>";
    }
  }

  newUser() {}

  get email(): FormControl {
    return this.formGroup.get("email") as FormControl;
  }
}
