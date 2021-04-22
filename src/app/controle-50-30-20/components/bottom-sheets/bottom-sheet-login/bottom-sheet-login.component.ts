import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, shareReplay } from "rxjs/operators";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/services/storage.service";
import { UtilService } from "src/app/services/util.service";
import { Controle503020Service } from "../../../controle-50-30-20.service";
import { BottomSheetNovoUsuarioComponent } from "../bottom-sheet-novo-usuario/bottom-sheet-novo-usuario.component";

@Component({
  selector: "bottom-sheet-login",
  templateUrl: "bottom-sheet-login.component.html",
  styleUrls: ["./bottom-sheet-login.component.scss"],
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
    private controleService: Controle503020Service,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private utilService: UtilService,
    public fb: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private bottomSheet: MatBottomSheet
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
      password: ["", [Validators.required]],
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
    if (this.mail.value) {
      this.controleService
        .findUserByEmailAndPassword(this.mail.value, this.password.value)
        .subscribe(
          (res) => {
            if (res) {
              this.fechar();
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
    if (control.hasError("mail")) {
      return "Um e-mail válido tem o formato <strong>nome@provedor.com</strong>";
    }

    if (control.hasError("emailExiste")) {
      return "O email <strong>já está cadastrado</strong> no eBarn";
    }

    if (control.hasError("notEqual")) {
      return " Os emails informados não são <strong>iguais</strong>";
    }
  }

  newUser() {
    this.fechar();
    const bottomSheefNewUser = this.bottomSheet.open(
      BottomSheetNovoUsuarioComponent,
      {
        disableClose: true,
      }
    );
    bottomSheefNewUser.afterDismissed().subscribe((response) => {
      if (response.openLogin) {
        this.bottomSheet.open(BottomSheetLoginComponent);
      }
      this.changeDetection.detectChanges();
    });
  }

  get mail(): FormControl {
    return this.formGroup.get("mail") as FormControl;
  }

  get password(): FormControl {
    return this.formGroup.get("password") as FormControl;
  }
}
