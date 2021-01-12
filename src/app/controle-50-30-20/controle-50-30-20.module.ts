import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Controle503020RoutingModule } from "./controle-50-30-20-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule, PieChartModule } from "@swimlane/ngx-charts";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import "hammerjs";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule, MatTabGroup } from "@angular/material/tabs";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LOCALE_ID } from "@angular/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { NgxCurrencyModule } from "ngx-currency";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatStepperModule } from "@angular/material/stepper";
import { FlexLayoutModule } from "@angular/flex-layout";
import { environment } from "src/environments/environment";
import { StorageService } from "../services/storage.service";
import { UtilService } from "../services/util.service";
import { Controle503020Component } from "./controle-50-30-20.component";
import { RouterModule } from "@angular/router";
import { BottomSheetCodigoSecretoComponent } from "./components/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component";
import { BottomSheetGraficoDespesasComponent } from "./components/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetLancamentosDespesasComponent } from "./components/bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component";
import { BottomSheetNovaDespesa } from "./components/bottom-sheet-nova-despesa/bottom-sheet-nova-despesa.component";
import { BottomSheetListaDespesasComponent } from "./components/bottom-sheet-lista-despesas/bottom-sheet-lista-despesas.component";
import { BottomSheetComoFuncionaComponent } from "./components/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component";
import { ConfigService } from "../services/config.service";
import { Controle503020Service } from "./controle-50-30-20.service";

export const routes = [
  { path: "", component: Controle503020Component, pathMatch: "full" },
];

@NgModule({
  declarations: [
    Controle503020Component,
    BottomSheetListaDespesasComponent,
    BottomSheetCodigoSecretoComponent,
    BottomSheetGraficoDespesasComponent,
    BottomSheetLancamentosDespesasComponent,
    BottomSheetComoFuncionaComponent,
    BottomSheetNovaDespesa,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule,
    PieChartModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    NgxCurrencyModule,
    MatBadgeModule,
    MatChipsModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatStepperModule,
    Controle503020RoutingModule,
    MatTabsModule,
    MatStepperModule,
  ],
  providers: [
    StorageService,
    UtilService,
    ConfigService,
    Controle503020Service,
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Controle503020Module {}
