import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculeAgoraService {

  private atualizarDespesasSubject = new Subject<any>();

  constructor() {
    
  }

  atualizarDespesasObservable(): Observable<any> {
    return this.atualizarDespesasSubject.asObservable();
  }

  atualizarCarrinho() {
    this.atualizarDespesasSubject.next();
  }

  registros() {
    return [
      {
        codigo: "ABC123",
        email: "user@gmail.com",
        lancamentos: [
          {
            mes: "03/2020",
            despesas: [
              {
                tipo: "fix",
                name: "Fixas",
                itensDespesa: [
                  {
                    title: 'Supermercado',
                    desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil',
                    valor: 0,
                    obs: ""
                  },
                  {
                    title: 'Conta de Energia',
                    desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos',
                    valor: 0,
                    obs: ""
                  }
                ]
              },
              {
                tipo: "var",
                name: "Variáveis",
                itensDespesa: [
                  {
                    title: 'Ida ao Restaurante',
                    desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil',
                    valor: 0,
                    obs: ""
                  },
                  {
                    title: 'Viagem',
                    desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos',
                    valor: 0,
                    obs: ""
                  }
                ]
              }, {
                tipo: "inv",
                name: "Investimentos",
                itensDespesa: [
                  {
                    title: 'Poupança',
                    desc: 'Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil',
                    valor: 0,
                    obs: ""
                  },
                  {
                    title: 'Fundo de Investimento',
                    desc: 'Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos',
                    valor: 0,
                    obs: ""
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  gastos() {
    return [
      {
        tipo: "fix",
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
        tipo: "var",
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
        tipo: "inv",
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
