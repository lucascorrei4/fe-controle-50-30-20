import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, share, shareReplay } from "rxjs/operators";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
import { Launch } from "src/app/models/launch";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-grouped-bar-chart",
  templateUrl: "./grouped-bar-chart.component.html",
  styleUrls: ["./grouped-bar-chart.component.scss"],
})
export class GroupedBarChartComponent implements OnInit {
  public totalExpensesFixas: number;
  public totalExpensesVariaveis: number;
  public totalExpensesInvestimentos: number;
  public totalEarningFixas: number = 0;
  public totalEarningVariaveis: number = 0;
  public totalEarningInvestimentos: number = 0;
  public showGraph: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public showGraph$ = this.showGraph.asObservable().pipe(share());

  public graph;

  constructor(
    private controleService: Controle503020Service,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    console.log("iniciou graph");

    this.loadGraph();
  }

  private getTotalLaunchesByType(launches: Launch[], type: string): number {
    return launches
      .filter((launch) => launch.type === type)
      .reduce((acc, val) => (acc += val.valor), 0);
  }

  private loadGraph() {
    this.controleService.monthEarning$.subscribe((total) => {
      console.log("monthearning", total);

      this.totalEarningFixas = total * 0.5;
      this.totalEarningVariaveis = total * 0.3;
      this.totalEarningInvestimentos = total * 0.2;

      console.log("totalEarningFixas", this.totalEarningFixas);
      console.log("totalEarningVariaveis", this.totalEarningVariaveis);
      console.log("totalEarningInvestimentos", this.totalEarningInvestimentos);
    });
    this.controleService.monthLaunches$.subscribe((launches: Launch[]) => {
      this.showGraph.next(true);
      console.log("monthLaunches", launches);
      this.totalExpensesFixas = this.getTotalLaunchesByType(launches, "FIXAS");
      this.totalExpensesVariaveis = this.getTotalLaunchesByType(
        launches,
        "VARIAVEIS"
      );
      this.totalExpensesInvestimentos = this.getTotalLaunchesByType(
        launches,
        "INVESTIMENTOS"
      );
      console.log("totalExpensesFixas", this.totalExpensesFixas);
      console.log("totalExpensesVariaveis", this.totalExpensesVariaveis);
      console.log(
        "totalExpensesInvestimentos",
        this.totalExpensesInvestimentos
      );
      this.renderGraph();
    });
  }

  renderGraph() {
    var trace1 = {
      x: ["FIXAS", "VARIÁVEIS", "INVESTIMENTOS"],
      y: [
        this.totalEarningFixas,
        this.totalEarningVariaveis,
        this.totalEarningInvestimentos,
      ],
      name: "IDEAL",
      marker: { color: "rgb(98, 76, 87)" },
      type: "bar",
    };
    
    var trace2 = {
      x: ["FIXAS", "VARIÁVEIS", "INVESTIMENTOS"],
      y: [
        this.totalExpensesFixas,
        this.totalExpensesVariaveis,
        this.totalExpensesInvestimentos,
      ],
      name: "REAL",
      marker: { color: "rgb(235, 47, 6)" },
      type: "bar",
    };

    this.graph = {
      data: [trace1, trace2],
      layout: { barmode: "group" },
    };
    console.log("finalizou graph");
  }
}
