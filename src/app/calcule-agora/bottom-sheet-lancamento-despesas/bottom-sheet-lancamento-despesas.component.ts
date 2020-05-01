import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';
import { Lancamento } from 'src/app/models/lancamento';
import { Despesa } from 'src/app/models/despesa';
import { DespesaEnum } from 'src/app/enums/despesas-enum';
import { UtilService } from 'src/app/services/util.service';
import { DespesaItem } from 'src/app/models/despesa-item';

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
        console.log(this.lancamentos)
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
        console.log('carregarDespesasSelecionadas', this.despesasSelecionadas);
    }

    getFormattedPrice(price: number) {
        return this.utilService.getFormattedPrice(price).substring(3);
    }

    removerDespesa(itemDespesa: DespesaItem) {
        this.despesasSelecionadas.forEach(despesa => {
            despesa.itensDespesa = despesa.itensDespesa.filter(item => item != itemDespesa);
        });

        this.atualizarDespesas();
    }

    atualizarDespesas() {
        let atualizarStorage = false;

        this.lancamentos.forEach(lancamento => {
            lancamento.despesas.forEach(despesa => {
                if (this.mesAtual === lancamento.mes && String(despesa.tipo) === this.despesasSelecionadas[0].tipo) {
                    lancamento.despesas = [];
                    lancamento.despesas.push(...this.despesasSelecionadas);
                    atualizarStorage = true;
                }
            })
        });

        if (atualizarStorage) {
            this.localStorage.setLocalStorageLancamentos(this.lancamentos);
            this.carregarLancamentos();
        }
        
    }
}