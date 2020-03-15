import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieComponent } from './pie-chart/pie.component';

export const routes = [
  { path: '', redirectTo: 'bar', pathMatch: 'full' },
  { path: 'pie', component: PieComponent, data: { breadcrumb: 'Pie Charts' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule
  ],
  declarations: [
    PieComponent
  ]
})
export class ChartsModule { }