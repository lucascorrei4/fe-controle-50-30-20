import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu.component";
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatTooltipModule,
} from "@angular/material";

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
