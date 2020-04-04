import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';
import { Lancamento } from 'src/app/models/lancamento';
import { Despesa } from 'src/app/models/despesa';
import { MatChipEvent } from '@angular/material/chips';
import { DespesaEnum } from 'src/app/enums/despesas-enum';

@Component({
    selector: 'bottom-sheet-lancamento-despesas',
    templateUrl: 'bottom-sheet-lancamento-despesas.component.html',
    styleUrls: ['bottom-sheet-lancamento-despesas.component.scss']
})
export class BottomSheetLancamentosDespesasComponent implements OnInit {

    public lancamentos: Lancamento[];
    public despesas: Despesa[] = [];
    public despesasSelecionadas: Despesa[] = [];
    public DespesaEnum = DespesaEnum;

    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetLancamentosDespesasComponent>,
        private snackBar: MatSnackBar,
        private localStorage: StorageService) {
    }

    ngOnInit() {
        this.lancamentos = this.localStorage.getLocalStorageLancamentos();
        if (this.lancamentos.length > 0) {
            this.carregarDespesas(this.lancamentos);
        }
    }

    carregarDespesas(lancamentos: Lancamento[]) {
        lancamentos.forEach(lancamento => {
            this.despesas.push(...lancamento.despesas);
        });

        this.carregarDespesasSelecionadas(Object.values(DespesaEnum)[0])
        console.log(this.despesasSelecionadas)
    }

    enviarCodigoSecreto(): void {
        this.bottomSheetRef.dismiss();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    selecionarDespesa(despesa): void {
        console.log(despesa)
        this.carregarDespesasSelecionadas(despesa);
    }

    carregarDespesasSelecionadas(despesaSelecionada: string) {
        this.despesasSelecionadas = this.despesas.filter(despesa => String(despesa.tipo) === despesaSelecionada);
    }
}