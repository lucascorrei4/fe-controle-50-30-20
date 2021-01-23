import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TotalAndGraphicComponent } from "./total-and-graphic.component";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
} from "@angular/material";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartComponent } from "./chart/chart.component";

@NgModule({
  declarations: [TotalAndGraphicComponent, ChartComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    NgxChartsModule,
    MatProgressBarModule,
  ],
  exports: [TotalAndGraphicComponent],
})
export class TotalAndGraphicModule {}
