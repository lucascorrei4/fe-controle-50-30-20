import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bottom-sheet-lancamento-despesas',
    templateUrl: 'bottom-sheet-lancamento-despesas.component.html',
})
export class BottomSheetLancamentosDespesasComponent {
    public despesas: any;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetLancamentosDespesasComponent>,
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