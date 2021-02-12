import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, flatMap, shareReplay } from "rxjs/operators";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
import { Launch } from "src/app/models/launch";
import { UtilService } from "src/app/services/util.service";

export class GraphData {
  title: string;
  type: string;
  totalType: number;
  totalRef?: number;
  position: any[];
}

@Component({
  selector: "app-total-and-graphic",
  templateUrl: "./total-and-graphic.component.html",
  styleUrls: ["./total-and-graphic.component.scss"],
})
export class TotalAndGraphicComponent implements OnInit {
  @Input() type: string;
  @Input() selectedMonthDesc: string;
  @Input() total: number;

  private totalSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  public totalExpenses: number = 0;
  public totalEarning: number = 0;
  public totalEarningFixas: number = 0;
  public totalEarningVariaveis: number = 0;
  public totalEarningInvestimentos: number = 0;
  public totalExpensesFixas: number = 0;
  public totalExpensesVariaveis: number = 0;
  public totalExpensesInvestimentos: number = 0;

  public graphIn;
  public graphOut;

  constructor(
    private controleService: Controle503020Service,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.totalSubject.next(this.total);

    this.controleService.monthEarning$.subscribe((total) => {
      this.totalEarning = total;
      this.totalEarningFixas = total * 0.5;
      this.totalEarningVariaveis = total * 0.3;
      this.totalEarningInvestimentos = total * 0.2;
      let dataIndicators = this.loadGraph(this.totalEarning);
      this.graphIn = {
        data: dataIndicators,
        layout: {
          width: 350,
          height: 250,
          margin: { t: 10, r: 25, l: 25, b: 10 },
        },
      };
    });
    this.controleService.monthLaunches$.subscribe((launches: Launch[]) => {
      this.totalExpensesFixas = this.controleService.getTotalLaunchesByType(
        launches,
        "FIXAS"
      );
      this.totalExpensesVariaveis = this.controleService.getTotalLaunchesByType(
        launches,
        "VARIAVEIS"
      );
      this.totalExpensesInvestimentos = this.controleService.getTotalLaunchesByType(
        launches,
        "INVESTIMENTOS"
      );
      console.log("entrou aqui");
      this.controleService.totalExpenses$.subscribe((total) => {
        this.totalExpenses = total;
        let dataIndicators = this.loadGraph(this.totalExpenses);
        this.graphOut = {
          data: dataIndicators,
          layout: {
            width: 350,
            height: 250,
            margin: { t: 10, r: 25, l: 25, b: 10 },
          },
        };
        console.log("saiu aqui");
      });
    });
  }

  private loadGraph(total): any[] {
    let dataIndicators = [];
    let graphData = this.getGraphData(total);
    graphData.forEach((graph) => {
      dataIndicators.push({
        type: "indicator",
        mode: "number+gauge+delta",
        value: this.type === "IN" ? graph.totalType : this.getRefOut(graph.type),
        domain: { x: [0.25, 1], y: graph.position },
        title: {
          text: `<b>${
            graph.type
          }</b><br><span style='color: gray; font-size:0.7em'> ${
            this.type === "IN"
              ? this.utilService.getFormattedPrice(graph.totalType)
              : this.utilService.getFormattedPrice(this.getRefOut(graph.type))
          }</span>${
            this.type === "OUT"
              ? "<br><span style='color: gray; font-size:0.7em'> IDEAL: " +
                this.utilService.getFormattedPrice(this.getRef(graph.type)) +
                "</span>"
              : ""
          }`,
          font: { size: 11 },
        },
        delta: {
          reference:
            this.type === "IN" ? graph.totalType : this.getRefOut(graph.type),
        },
        gauge: {
          shape: "bullet",
          axis: {
            range: [
              null,
              this.type === "IN" ? graph.totalRef : this.getRef(graph.type),
            ],
          },
          threshold: {
            line: { color: "black", width: 2 },
            thickness: 0.75,
            value:
              this.type === "IN" ? graph.totalType : this.getRefOut(graph.type),
          },
          steps: [
            { range: [0, this.type === "IN" ? graph.totalType : this.getRefOut(graph.type)], color: "gray" },
            {
              range: [0,  this.type === "IN" ? graph.totalType : this.getRefOut(graph.type)],
              color: "lightgray",
            },
            {
              range: [
                this.type === "IN" ? graph.totalType : this.getRefOut(graph.type),
                this.type === "IN" ? graph.totalType : this.getRef(graph.type),
              ],
              color: "yellow",
            },
          ],
          bar: { color: "black" },
        },
      });
    });
    return dataIndicators;
  }

  private getRef(type: string) {
    switch (type) {
      case "FIXAS":
        return this.totalEarningFixas;
      case "VARIÁVEIS":
        return this.totalEarningVariaveis;
      case "INVESTIM.":
        return this.totalEarningInvestimentos;
    }
  }

  private getRefOut(type: string) {
    switch (type) {
      case "FIXAS":
        return this.totalExpensesFixas;
      case "VARIÁVEIS":
        return this.totalExpensesVariaveis;
      case "INVESTIM.":
        return this.totalExpensesInvestimentos;
    }
  }

  private getGraphData(totalEarning: number): GraphData[] {
    let graphDataList: GraphData[] = [];

    let graphData = new GraphData();
    graphData.title = "IDEAL";
    graphData.type = "FIXAS";
    graphData.totalType = totalEarning * 0.5;
    graphData.totalRef = totalEarning;
    graphData.position = [0.7, 0.9];

    graphDataList.push(graphData);

    graphData = new GraphData();
    graphData.title = "IDEAL";
    graphData.type = "VARIÁVEIS";
    graphData.totalType = totalEarning * 0.3;
    graphData.totalRef = totalEarning;
    graphData.position = [0.4, 0.6];

    graphDataList.push(graphData);

    graphData = new GraphData();
    graphData.title = "IDEAL";
    graphData.type = "INVESTIM.";
    graphData.totalType = totalEarning * 0.2;
    graphData.totalRef = totalEarning;
    graphData.position = [0.1, 0.3];

    graphDataList.push(graphData);

    return graphDataList;
  }

  public graphTemplate = {
    data: [
      {
        type: "indicator",
        mode: "number+gauge+delta",
        value: 5000,
        domain: { x: [0.25, 1], y: [0.7, 0.9] },
        title: {
          text:
            "<b>Fixas</b><br><span style='color: gray; font-size:0.8em'>R$</span>",
          font: { size: 11 },
        },
        gauge: {
          shape: "bullet",
          axis: { range: [null, 10400] },
          threshold: {
            line: { color: "black", width: 2 },
            thickness: 0.75,
            value: 5000,
          },
          steps: [
            { range: [0, 5000], color: "gray" },
            {
              range: [0, 5000],
              color: "lightgray",
            },
          ],
          bar: { color: "black" },
        },
      },
      {
        type: "indicator",
        mode: "number+gauge+delta",
        value: 2400,
        domain: { x: [0.25, 1], y: [0.4, 0.6] },
        title: {
          text:
            "<b>Variáveis</b><br><span style='color: gray; font-size:0.8em'>50%</span><br><span style='color: gray; font-size:0.8em'>R$</span>",
          font: { size: 11 },
        },
        gauge: {
          shape: "bullet",
          axis: { range: [null, 10400] },
          threshold: {
            line: { color: "black", width: 2 },
            thickness: 0.75,
            value: 2400,
          },
          steps: [
            { range: [0, 2400], color: "gray" },
            {
              range: [0, 2400],
              color: "lightgray",
            },
          ],
          bar: { color: "black" },
        },
      },

      {
        type: "indicator",
        mode: "number+gauge+delta",
        value: 3000,

        domain: { x: [0.25, 1], y: [0.1, 0.3] },
        title: {
          text:
            "<b>Investimentos</b><br><span style='color: gray; font-size:0.8em'>R$</span>",
          font: { size: 11 },
        },
        gauge: {
          shape: "bullet",
          axis: { range: [null, 10400] },
          threshold: {
            line: { color: "black", width: 2 },
            thickness: 0.75,
            value: 3000,
          },
          steps: [
            { range: [0, 3000], color: "gray" },
            {
              range: [0, 3000],
              color: "lightgray",
            },
          ],
          bar: { color: "black" },
        },
      },
    ],
    layout: { width: 350, height: 250, margin: { t: 10, r: 25, l: 25, b: 10 } },
  };

  get total$(): Observable<number> {
    return this.totalSubject
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay());
  }
}
