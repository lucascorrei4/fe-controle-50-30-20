import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TotalComponent } from "./total.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
} from "@angular/material";

import * as PlotlyJS from "plotly.js/dist/plotly.js";
import { PlotlyModule } from "angular-plotly.js";
import { UtilService } from "src/app/services/util.service";
import { LoadingBarModule } from "../../loading-bar/loading-bar.module";
import { BottomSheet503020Module } from "../../bottom-sheets/bottom-sheet-503020/bottom-sheet-503020.module";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [TotalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    PlotlyModule,
    LoadingBarModule,
    BottomSheet503020Module,
  ],
  exports: [TotalComponent],
  providers: [UtilService],
})
export class TotalModule {}
