import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TotalAndGraphicComponent,
} from "./total-and-graphic.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
} from "@angular/material";

import * as PlotlyJS from "plotly.js/dist/plotly.js";
import { PlotlyModule } from "angular-plotly.js";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [TotalAndGraphicComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    PlotlyModule,
  ],
  exports: [TotalAndGraphicComponent],
})
export class TotalAndGraphicModule {}
