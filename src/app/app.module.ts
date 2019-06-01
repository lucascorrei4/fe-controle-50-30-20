import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
import { BottomSheetDespesasComponent } from './calcule-agora/bottom-sheet-despesas/bottom-sheet-despesas.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BottomSheetCodigoSecretoComponent } from './calcule-agora/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalculeAgoraComponent,
    BottomSheetDespesasComponent,
    BottomSheetCodigoSecretoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [CalculeAgoraService],
  bootstrap: [AppComponent],
  entryComponents: [
    BottomSheetDespesasComponent,
    BottomSheetCodigoSecretoComponent
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
