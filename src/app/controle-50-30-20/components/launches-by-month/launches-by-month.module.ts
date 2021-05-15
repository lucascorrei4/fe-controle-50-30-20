import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTooltipModule,
} from "@angular/material";

import { UtilService } from "src/app/services/util.service";
import { LoadingBarModule } from "../loading-bar/loading-bar.module";
import { LaunchesByMonthComponent } from "./launches-by-month.component";

@NgModule({
  declarations: [LaunchesByMonthComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    LoadingBarModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatChipsModule,
  ],
  exports: [LaunchesByMonthComponent],
  providers: [UtilService],
})
export class LaunchesByMonthModule {}
