import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { BottomSheetComoFuncionaComponent } from "../bottom-sheets/bottom-sheet-como-funciona/bottom-sheet-como-funciona.component";

@Component({
  selector: "app-how-it-works",
  templateUrl: "./how-it-works.component.html",
  styleUrls: ["./how-it-works.component.scss"],
})
export class HowItWorksComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  abrirComoFuncionaBottomSheet() {
    this.bottomSheet.open(BottomSheetComoFuncionaComponent, {
      panelClass: "bottom-sheet-style",
    });
  }
}
