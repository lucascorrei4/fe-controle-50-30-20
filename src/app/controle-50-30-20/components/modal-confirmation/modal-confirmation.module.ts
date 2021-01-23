import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { ModalConfirmationComponent } from "./modal-confirmation.component";

@NgModule({
  declarations: [ModalConfirmationComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [ModalConfirmationComponent],
})
export class ModalConfirmationModule {}
