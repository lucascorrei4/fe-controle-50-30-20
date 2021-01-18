import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabsComponent } from "./tabs.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { NgxChartsModule, PieChartModule } from "@swimlane/ngx-charts";
import {
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
} from "@angular/material";
import { NgxCurrencyModule } from "ngx-currency";

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
    NgxCurrencyModule,
    NgxChartsModule,
  ],
  exports: [TabsComponent],
})
export class TabsModule {}
