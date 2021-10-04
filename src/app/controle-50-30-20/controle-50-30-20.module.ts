import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Controle503020RoutingModule } from "./controle-50-30-20-routing.module";
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
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
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
import { BottomSheetLoginComponent } from "./components/bottom-sheets/bottom-sheet-login/bottom-sheet-login.component";
import { BottomSheetGraficoDespesasComponent } from "./components/bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetNovaDespesa } from "./components/bottom-sheets/bottom-sheet-nova-despesa/bottom-sheet-nova-despesa.component";
import { BottomSheetListaDespesasComponent } from "./components/bottom-sheets/bottom-sheet-lista-despesas/bottom-sheet-lista-despesas.component";
import { BottomSheetComoFuncionaComponent } from "./components/bottom-sheets/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component";
import { ConfigService } from "../services/config.service";
import { Controle503020Service } from "./controle-50-30-20.service";
import { HeaderModule } from "./components/header/header.module";
import { FooterMenuModule } from "./components/footer-menu/footer-menu.module";
import { TabsModule } from "./components/tabs/tabs.module";
import { HowItWorksModule } from "./components/how-it-works/how-it-works.module";
import { MenuModule } from "./components/menu/menu.module";
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatNativeDateModule,
} from "@angular/material";
import { BottomSheetLaunchesByMonthComponent } from "./components/bottom-sheets/bottom-sheet-open-launches-by-month/bottom-sheet-open-launches-by-month.component";
import { BottomSheetEarningsComponent } from "./components/bottom-sheets/bottom-sheet-earnings/bottom-sheet-earnings.component";
import { ModalConfirmationModule } from "./components/modal-confirmation/modal-confirmation.module";
import { PlotlyModule } from "angular-plotly.js";
import { BottomSheetNovoUsuarioComponent } from "./components/bottom-sheets/bottom-sheet-novo-usuario/bottom-sheet-novo-usuario.component";
import { GroupedBarChartModule } from "./components/tabs/grouped-bar-chart/grouped-bar-chart.module";
import { LaunchesByMonthModule } from "./components/launches-by-month/launches-by-month.module";
import { TotalModule } from "./components/tabs/total/total.module";
import { TotalAndGraphicModule } from "./components/tabs/total-and-graphic/total-and-graphic.module";
import { BottomSheetShareComponent } from "./components/bottom-sheets/bottom-sheet-share/bottom-sheet-share.component";
import { BottomSheetFilterMonthComponent } from "./components/bottom-sheets/bottom-sheet-filter-month/bottom-sheet-filter-month.component";

export const routes = [
  { path: "", component: Controle503020Component, pathMatch: "full" },
];

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [
    Controle503020Component,
    BottomSheetListaDespesasComponent,
    BottomSheetLoginComponent,
    BottomSheetGraficoDespesasComponent,
    BottomSheetComoFuncionaComponent,
    BottomSheetNovaDespesa,
    BottomSheetLaunchesByMonthComponent,
    BottomSheetEarningsComponent,
    BottomSheetNovoUsuarioComponent,
    BottomSheetShareComponent,
    BottomSheetFilterMonthComponent,
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
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
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
    HeaderModule,
    FooterMenuModule,
    TabsModule,
    HowItWorksModule,
    MenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    ModalConfirmationModule,
    MatDialogModule,
    MatAutocompleteModule,
    PlotlyModule,
    MatInputModule,
    MatFormFieldModule,
    GroupedBarChartModule,
    LaunchesByMonthModule,
    TotalModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TotalAndGraphicModule,
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
  exports: [
    MatSnackBarModule,
    BottomSheetLoginComponent,
    BottomSheetNovoUsuarioComponent,
  ],
})
export class Controle503020Module {}
