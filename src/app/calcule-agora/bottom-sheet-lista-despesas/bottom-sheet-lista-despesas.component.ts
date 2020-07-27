import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bottom-sheet-lista-despesas',
    templateUrl: 'bottom-sheet-lista-despesas.component.html',
})
export class BottomSheetListaDespesasComponent {
    public despesas: any;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetListaDespesasComponent>,
        private calculeAgoraService: CalculeAgoraService,
        private snackBar: MatSnackBar) {
        this.despesas = this.calculeAgoraService.gastos();
    }

    select(event: MouseEvent, tipo: string, nome: string, subItem: string): void {
        this.openSnackBar('Você selecionou:', subItem);
        this.bottomSheetRef.dismiss({ tipoDespesa: tipo, nomeDespesa: nome, despesa: subItem });
        event.preventDefault();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}