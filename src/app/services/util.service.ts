import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {
  getFormattedPrice(price: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }

  isEmpty(obj) {
    return (
      obj === "" ||
      obj === undefined ||
      obj == null ||
      Object.keys(obj).length === 0
    );
  }
}
