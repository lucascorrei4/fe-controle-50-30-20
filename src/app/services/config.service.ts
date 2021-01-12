import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {
  constructor() {}

  getUrlServiceNode(): string {
    return environment.urlServerNode;
  }
}
