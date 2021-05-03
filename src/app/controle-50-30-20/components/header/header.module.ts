import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HowItWorksModule } from "../how-it-works/how-it-works.module";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FlexLayoutModule, HowItWorksModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
