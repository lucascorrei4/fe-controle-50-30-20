import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatBottomSheetRef,
  MatIconRegistry,
  MatSnackBar,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

export enum AcaoStatus {
  INVITE = "INVITE",
  COMPARTILHAMENTO = "COMPARTILHAMENTO",
}

@Component({
  selector: "bottom-sheet-share",
  templateUrl: "bottom-sheet-share.component.html",
  styleUrls: ["./bottom-sheet-share.component.scss"],
})
export class BottomSheetShareComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private btnClicked = "";
  public form: FormGroup;

  public sucess = null;
  public acao = AcaoStatus;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetShareComponent>,
    private snackBar: MatSnackBar,
    private route: Router,
    public fb: FormBuilder,
    private storageService: StorageService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nome: [null],
    });
  }

  public onClickWhatsApp() {
    window.open(
      `https://api.whatsapp.com/send?text=Ola! Dá uma olhada neste app de finanças para casais: ${this.data.url.replace(
        "&",
        "%26"
      )}`,
      "_blank"
    );
  }

  openSnackBarEmailCompartilhado(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  public enableSharedEmail() {
    this.updateStateBtnClicked("email");
  }

  public enableSharedWhatsApp() {
    this.updateStateBtnClicked("whatsapp");
  }

  public enableSharedLink() {
    this.updateStateBtnClicked("link");
  }

  public showSharedWhatsApp() {
    return this.btnClicked === "whatsapp";
  }

  public showSharedEmail() {
    return this.btnClicked === "email";
  }

  public showSharedLink() {
    return this.btnClicked === "link";
  }

  private updateStateBtnClicked(label: string) {
    this.btnClicked = this.btnClicked === label ? "" : label;
  }

  public copiarParaAreaTransferencia() {
    document.execCommand("copy");
    this.openSnackBarAreaTransferencia("Copiado para área de transferência");
  }

  private addIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "whatsapp",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/whatsapp.svg")
    );
    iconRegistry.addSvgIcon(
      "facebook",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/facebook.svg")
    );
  }

  private openSnackBarAreaTransferencia(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
