import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { Subject } from "rxjs";
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
  selector: "app-total",
  templateUrl: "./total.component.html",
  styleUrls: ["./total.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent {
  @Input() type: string;
  @Input() selectedMonthDesc: string;
  @Input() total: number;

  constructor(
    private controleService: Controle503020Service,
    public utilService: UtilService
  ) {}
}
