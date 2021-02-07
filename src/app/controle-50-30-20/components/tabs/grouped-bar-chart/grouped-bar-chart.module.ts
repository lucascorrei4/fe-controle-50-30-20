import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupedBarChartComponent } from "./grouped-bar-chart.component";
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

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [GroupedBarChartComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    PlotlyModule,
    LoadingBarModule,
  ],
  exports: [GroupedBarChartComponent],
  providers: [UtilService],
})
export class GroupedBarChartModule {}
