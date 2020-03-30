import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalculeAgoraService } from '../calcule-agora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';
import { Lancamento } from 'src/app/models/lancamento';
import { Despesa } from 'src/app/models/despesa';

@Component({
    selector: 'bottom-sheet-lancamento-despesas',
    templateUrl: 'bottom-sheet-lancamento-despesas.component.html',
    styleUrls: ['bottom-sheet-lancamento-despesas.component.scss']
})
export class BottomSheetLancamentosDespesasComponent implements OnInit {

    public lancamentos: Lancamento[];
    public despesas: Despesa[] = [];

    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetLancamentosDespesasComponent>,
        private snackBar: MatSnackBar,
        private localStorage: StorageService) {
    }

    ngOnInit() {
        this.lancamentos = this.localStorage.getLocalStorageLancamentos();
        console.log(this.lancamentos)
        if (this.lancamentos.length > 0) {
            this.carregarDespesas(this.lancamentos);
        }
    }

    carregarDespesas(lancamentos: Lancamento[]) {
        lancamentos.forEach(lancamento => {
            this.despesas.push(...lancamento.despesas);
        });
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