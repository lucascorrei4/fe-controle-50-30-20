import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface ModalData {
  title: string;
  description: string;
  labelConfirm?: string;
  labelCancel?: string;
  hideButtonCancel?: boolean;
}

@Component({
  selector: "app-modal-confirmation",
  templateUrl: "./modal-confirmation.component.html",
  styleUrls: ["./modal-confirmation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: ModalData
  ) {}
}
