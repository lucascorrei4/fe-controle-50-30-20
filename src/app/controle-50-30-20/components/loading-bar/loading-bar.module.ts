import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingBarComponent } from "./loading-bar.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
} from "@angular/material";

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
