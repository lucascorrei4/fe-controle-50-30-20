import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterMenuComponent } from "./footer-menu.component";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [FooterMenuComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  exports: [FooterMenuComponent],
})
export class FooterMenuModule {}
