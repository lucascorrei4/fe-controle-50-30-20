import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';

@Component({
    selector: 'bottom-sheet-despesas',
    templateUrl: 'bottom-sheet-despesas.component.html',
})
export class BottomSheetDespesasComponent {
    public despesas: any;
    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetDespesasComponent>, private calculeAgoraService: CalculeAgoraService) {
        this.despesas = this.calculeAgoraService.gastos();
    }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}