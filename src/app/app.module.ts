import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChartsModule, PieChartModule } from '@swimlane/ngx-charts';
import { CalculeAgoraComponent } from './calcule-agora/calcule-agora.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import 'hammerjs';
import { CalculeAgoraService } from './calcule-agora/calcule-agora.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { BottomSheetDespesasComponent } from './calcule-agora/bottom-sheet-despesas/bottom-sheet-despesas.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BottomSheetCodigoSecretoComponent } from './calcule-agora/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePtBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxCurrencyModule } from "ngx-currency";
import { UtilService } from './services/util.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BottomSheetGraficoDespesasComponent } from './calcule-agora/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component';
import { BottomSheetLancamentosDespesasComponent } from './calcule-agora/bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component';
import { BottomSheetComoFuncionaComponent } from './calcule-agora/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component';
import { StorageService } from './services/storage.service';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalculeAgoraComponent,
    BottomSheetDespesasComponent,
    BottomSheetCodigoSecretoComponent,
    BottomSheetGraficoDespesasComponent,
    BottomSheetLancamentosDespesasComponent,
    BottomSheetComoFuncionaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxCurrencyModule,
    MatBadgeModule,
    MatChipsModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule
  ],
  exports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    CalculeAgoraService,
    StorageService,
    UtilService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BottomSheetDespesasComponent,
    BottomSheetCodigoSecretoComponent,
    BottomSheetGraficoDespesasComponent,
    BottomSheetLancamentosDespesasComponent,
    BottomSheetComoFuncionaComponent
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
