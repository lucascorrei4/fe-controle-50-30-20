import { Component, Input, OnInit } from "@angular/core";
import { Controle503020Service } from "src/app/controle-50-30-20/controle-50-30-20.service";

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
  public totalEarning: number = 0;
  public graphData: GraphData[] = [];
  public graph;

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

  constructor(private controle503020Service: Controle503020Service) {}

  ngOnInit(): void {
    this.controle503020Service.monthEarning$.subscribe((total) => {
      this.total = total;

      console.log("total", this.total);

      let graphData = new GraphData();
      graphData.title = "IDEAL";
      graphData.type = "FIXAS";
      graphData.totalType = this.total * 0.5;
      graphData.totalRef = this.total;
      graphData.position = [0.7, 0.9];

      this.graphData.push(graphData);

      graphData = new GraphData();
      graphData.title = "IDEAL";
      graphData.type = "VARIÁVEIS";
      graphData.totalType = this.total * 0.3;
      graphData.totalRef = this.total;
      graphData.position = [0.4, 0.6];

      this.graphData.push(graphData);

      graphData = new GraphData();
      graphData.title = "IDEAL";
      graphData.type = "INVESTIMENTOS";
      graphData.totalType = this.total * 0.2;
      graphData.totalRef = this.total;
      graphData.position = [0.1, 0.3];

      this.graphData.push(graphData);

      this.graph = {
        data: null,
        layout: { width: 350, height: 250, margin: { t: 10, r: 25, l: 25, b: 10 } },
      };
      this.graph.data = [];
      this.graphData.forEach((graph) => {
        this.graph.data.push({
          type: "indicator",
          mode: "number+gauge+delta",
          value: graph.totalType,
          domain: { x: [0.25, 1], y: graph.position },
          title: {
            text: `<b>${graph.type}</b><br><span style='color: gray; font-size:0.8em'>R$ ${graph.totalType}</span>`,
            font: { size: 11 },
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
    });
  }
}
