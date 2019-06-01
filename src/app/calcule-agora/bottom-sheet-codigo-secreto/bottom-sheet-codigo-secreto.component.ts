import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bottom-sheet-codigo-secreto',
    templateUrl: 'bottom-sheet-codigo-secreto.component.html',
})
export class BottomSheetCodigoSecretoComponent {
    public despesas: any;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetCodigoSecretoComponent>,
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