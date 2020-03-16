import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculeAgoraService {

  gastos() {
    return [
      {
        name: "Fixas",
        subItems: [
          {
            title: 'Supermercado',
            desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil'
          },
          {
            title: 'Conta de Energia',
            desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos'
          }
        ]
      },
      {
        name: "Variáveis",
        subItems: [
          {
            title: 'Ida ao Restaurante',
            desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil'
          },
          {
            title: 'Viagem',
            desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos'
          }
        ]
      }, {
        name: "Investimentos",
        subItems: [
          {
            title: 'Poupança',
            desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil'
          },
          {
            title: 'Fundo de Investimento',
            desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos'
          }
        ]
      }
    ]
  }

}
