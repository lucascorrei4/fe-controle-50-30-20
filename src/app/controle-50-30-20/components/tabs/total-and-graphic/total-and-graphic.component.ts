import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, shareReplay } from "rxjs/operators";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";
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

  public totalEarningFixas: number = 0;
  public totalEarningVariaveis: number = 0;
  public totalEarningInvestimentos: number = 0;

  public graphIn;
  public graphOut;

  constructor(
    private controle503020Service: Controle503020Service,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.totalSubject.next(this.total);

    if (this.type === "IN") {
      this.controle503020Service.monthEarning$.subscribe((total) => {
        this.total = total;
        this.totalEarningFixas = total * 0.5;
        this.totalEarningVariaveis = total * 0.3;
        this.totalEarningInvestimentos = total * 0.2;
        let dataIndicators = this.loadGraph(total);
        this.graphIn = {
          data: dataIndicators,
          layout: {
            width: 350,
            height: 250,
            margin: { t: 10, r: 25, l: 25, b: 10 },
          },
        };
      });
    } else {
      this.controle503020Service.totalExpenses$.subscribe((total) => {
        this.total = total;
        let dataIndicators = this.loadGraph(total);
        this.graphOut = {
          data: dataIndicators,
          layout: {
            width: 350,
            height: 250,
            margin: { t: 10, r: 25, l: 25, b: 10 },
          },
        };
      });
    }
  }

  private loadGraph(total): any[] {
    let dataIndicators = [];
    let graphData = this.getGraphData(total);
    graphData.forEach((graph) => {
      dataIndicators.push({
        type: "indicator",
        mode: "number+gauge+delta",
        value: graph.totalType,
        domain: { x: [0.25, 1], y: graph.position },
        title: {
          text: `<b>${
            graph.type
          }</b><br><span style='color: gray; font-size:0.7em'> ${this.utilService.getFormattedPrice(
            graph.totalType
          )}</span>`,
          font: { size: 11 },
        },
        delta: {
          reference:
            this.type === "IN"
              ? graph.totalType
              : this.getRef(graph.type, graph.totalType),
        },
        gauge: {
          shape: "bullet",
          axis: { range: [null, graph.totalRef] },
          threshold: {
            line: { color: "black", width: 2 },
            thickness: 0.75,
            value: graph.totalType,
          },
          steps: [
            { range: [0, graph.totalType], color: "gray" },
            {
              range: [0, graph.totalType],
              color: "lightgray",
            },
          ],
          bar: { color: "black" },
        },
      });
    });
    return dataIndicators;
  }

  private getRef(type: string, totalType: number) {
    switch (type) {
      case "FIXAS":
        return this.totalEarningFixas;
      case "VARIÁVEIS":
        return this.totalEarningVariaveis;
      case "INVESTIM.":
        return this.totalEarningInvestimentos;
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
