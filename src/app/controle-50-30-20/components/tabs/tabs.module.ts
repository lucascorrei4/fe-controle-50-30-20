import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabsComponent } from "./tabs.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { NgxChartsModule, PieChartModule } from "@swimlane/ngx-charts";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
} from "@angular/material";
import { TotalAndGraphicModule } from "./total-and-graphic/total-and-graphic.module";
import { LoadingBarModule } from "../loading-bar/loading-bar.module";
import { LaunchesByMonthModule } from "../launches-by-month/launches-by-month.module";
import { TotalModule } from "./total/total.module";
import { RepeatedLaunchesModule } from "../repeated-launches/repeated-launches.module";

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatChipsModule,
    PieChartModule,
    NgxChartsModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    NgxChartsModule,
    MatButtonModule,
    TotalAndGraphicModule,
    LoadingBarModule,
    LaunchesByMonthModule,
    TotalModule,
    RepeatedLaunchesModule,
  ],
  exports: [TabsComponent],
})
export class TabsModule {}
