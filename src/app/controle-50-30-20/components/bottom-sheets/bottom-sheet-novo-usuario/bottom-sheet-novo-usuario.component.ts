import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, shareReplay } from "rxjs/operators";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { UtilService } from "src/app/services/util.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";

@Component({
  selector: "bottom-sheet-novo-usuario",
  templateUrl: "bottom-sheet-novo-usuario.component.html",
  styleUrls: ["./bottom-sheet-novo-usuario.component.scss"],
})
export class BottomSheetNovoUsuarioComponent implements OnInit {
  public despesas: any;
  public formGroup: FormGroup;

  public loggedUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public loggedUser$ = this.loggedUserSubject
    .asObservable()
    .pipe(distinctUntilChanged(), shareReplay());

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetNovoUsuarioComponent>,
    private controleService: Controle503020Service,
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
      mail: ["", [Validators.required, Validators.email]],
      inviteMail: [""],
    });
  }

  fechar(openLogin: boolean): void {
    this.bottomSheetRef.dismiss({ openLogin: openLogin });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  newUser() {
    if (this.mail.value && this.formGroup.valid) {
      let user = new User();
      user.mail = this.mail.value;
      user.inviteMail = this.inviteMail.value;
      this.controleService.newUser(user).subscribe(
        (res) => {
          if (res) {
            this.fechar(true);
            this.openSnackBar("Olá!", "Faça login para entrar!");
          } else {
            this.openSnackBar("OOPS", "Não autorizado!");
            this.mail.setValue(null);
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
      return "Um e-mail válido tem o formato <strong>nome@provedor.com</strong>";
    }

    if (control.hasError("emailExiste")) {
      return "O email <strong>já está cadastrado</strong> no eBarn";
    }

    if (control.hasError("notEqual")) {
      return " Os emails informados não são <strong>iguais</strong>";
    }
  }

  get mail(): FormControl {
    return this.formGroup.get("mail") as FormControl;
  }

  get inviteMail(): FormControl {
    return this.formGroup.get("inviteMail") as FormControl;
  }

  get password(): FormControl {
    return this.formGroup.get("password") as FormControl;
  }
}
