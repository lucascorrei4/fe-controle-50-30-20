import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bottom-sheet-grafico-despesas',
    templateUrl: 'bottom-sheet-grafico-despesas.component.html',
})
export class BottomSheetGraficoDespesasComponent {
    public despesas: any;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetGraficoDespesasComponent>,
        private snackBar: MatSnackBar) {
    }

    enviarCodigoSecreto(): void {
        this.bottomSheetRef.dismiss();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}