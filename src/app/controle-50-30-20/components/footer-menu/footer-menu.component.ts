import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { StorageService } from "src/app/services/storage.service";
import { Controle503020Service } from "../../controle-50-30-20.service";
import { BottomSheetCodigoSecretoComponent } from "../bottom-sheets/bottom-sheet-codigo-secreto/bottom-sheet-codigo-secreto.component";
import { BottomSheetGraficoDespesasComponent } from "../bottom-sheets/bottom-sheet-grafico-despesas/bottom-sheet-grafico-despesas.component";
import { BottomSheetLancamentosDespesasComponent } from "../bottom-sheets/bottom-sheet-lancamento-despesas/bottom-sheet-lancamento-despesas.component";

@Component({
  selector: "app-footer-menu",
  templateUrl: "./footer-menu.component.html",
  styleUrls: ["./footer-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterMenuComponent implements OnInit {
  public contLancamentoDespesas: number = 0;
  constructor(
    private bottomSheet: MatBottomSheet,
    private storageService: StorageService,
    private changeDetector: ChangeDetectorRef,
    private controle503020Service: Controle503020Service
  ) {}

  ngOnInit(): void {}

  abrirGraficoDespesasBottomSheet() {
    this.bottomSheet.open(BottomSheetGraficoDespesasComponent);
  }

  abrirLancamentosDespesasMesBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetLancamentosDespesasComponent
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.atualizarContadorLancamentoDespesas();
    });
  }

  atualizarContadorLancamentoDespesas() {
    var cont = 0;
    var lancamentos = this.storageService.getLocalStorageLancamentos();

    if (lancamentos.length > 0) {
      lancamentos.forEach((lancamento) => {
        lancamento.despesas.forEach((despesa) => {
          cont += despesa.itensDespesa.length;
        });
      });
    }

    this.contLancamentoDespesas = lancamentos.length === 0 ? 0 : cont;
    this.changeDetector.detectChanges();
  }

  abrirCodigoSecretoBottomSheet(): void {
    this.bottomSheet.open(BottomSheetCodigoSecretoComponent);
  }
}
