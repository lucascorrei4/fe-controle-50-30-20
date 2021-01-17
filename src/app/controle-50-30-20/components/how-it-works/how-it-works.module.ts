import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HowItWorksComponent } from "./how-it-works.component";
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
} from "@angular/material";

@NgModule({
  declarations: [HowItWorksComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
  exports: [HowItWorksComponent],
})
export class HowItWorksModule {}
