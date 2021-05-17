import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TotalAndGraphicComponent } from "./total-and-graphic.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTooltipModule,
} from "@angular/material";

import * as PlotlyJS from "plotly.js/dist/plotly.js";
import { PlotlyModule } from "angular-plotly.js";
import { UtilService } from "src/app/services/util.service";
import { LoadingBarModule } from "../../loading-bar/loading-bar.module";

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
    LoadingBarModule,
    MatTabsModule,
  ],
  exports: [TotalAndGraphicComponent],
  providers: [UtilService],
})
export class TotalAndGraphicModule {}
