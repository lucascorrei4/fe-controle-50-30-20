import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
} from "@angular/material";
import { BottomSheet503020Component } from "./bottom-sheet-503020.component";
import { TotalAndGraphicModule } from "../../tabs/total-and-graphic/total-and-graphic.module";

@NgModule({
  declarations: [BottomSheet503020Component],
  imports: [
    CommonModule,
    MatProgressBarModule,
    TotalAndGraphicModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [BottomSheet503020Component],
})
export class BottomSheet503020Module {}
