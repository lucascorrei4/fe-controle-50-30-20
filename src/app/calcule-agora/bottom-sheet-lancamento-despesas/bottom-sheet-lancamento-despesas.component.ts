import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';
import { Lancamento } from 'src/app/models/lancamento';
import { Despesa } from 'src/app/models/despesa';
import { DespesaEnum } from 'src/app/enums/despesas-enum';
import { UtilService } from 'src/app/services/util.service';

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
    public mesAtual: string = null;

    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetLancamentosDespesasComponent>,
        private snackBar: MatSnackBar,
        private localStorage: StorageService,
        private utilService: UtilService) {
    }

    ngOnInit() {
        this.carregarLancamentos();
    }

    carregarLancamentos() {
        this.lancamentos = this.localStorage.getLocalStorageLancamentos();
        if (this.lancamentos.length > 0) {
            this.carregarDespesas(this.lancamentos);
        }
    }

    carregarDespesas(lancamentos: Lancamento[]) {
        lancamentos.forEach(lancamento => {
            this.despesas.push(...lancamento.despesas);
            this.mesAtual = lancamento.mes;
        });

        this.carregarDespesasSelecionadas(Object.values(DespesaEnum)[0])
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
        this.carregarDespesasSelecionadas(despesa);
    }

    carregarDespesasSelecionadas(despesaSelecionada: string) {
        this.despesasSelecionadas = this.despesas.filter(despesa => String(despesa.tipo) === despesaSelecionada);
    }

    getFormattedPrice(price: number) {
        return this.utilService.getFormattedPrice(price).substring(3);
    }

    removerDespesa(itemDespesa) {
        this.despesasSelecionadas.forEach(item => {
            item.itensDespesa.splice(item.itensDespesa.indexOf(itemDespesa), 1);

        });

        this.atualizarDespesas();
    }

    atualizarDespesas() {
        this.despesas = [];
        this.despesas = this.despesasSelecionadas;
        let atualizarStorage = false;

        this.lancamentos.forEach(lancamento => {
            if (this.mesAtual === lancamento.mes) {
                lancamento.despesas = [];
                lancamento.despesas.push(...this.despesas);
                atualizarStorage = true;
            }
        });

        if (atualizarStorage) {
            this.localStorage.setLocalStorageLancamentos(this.lancamentos);
            this.carregarLancamentos();
        }
    }
}