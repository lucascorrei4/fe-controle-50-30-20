import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Category } from "../models/category";
import { User } from "../models/user";
import { ConfigService } from "../services/config.service";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class Controle503020Service {
  private url: string = "";
  private token: any;
  private atualizarCarrinhoSubject = new Subject<any>();
  public categoriesGrouped: any[] = [];

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService
  ) {
    this.url = configService.getUrlServiceNode();

    this.token = new HttpHeaders({
      Authorization: localStorage.getItem("localToken"),
    });
  }

  // User

  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, user, {
      headers: this.token,
    });
  }

  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/findByEmail?email=${email}`, {
      headers: this.token,
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.url}/category`, {
        headers: this.token,
      })
      .pipe(
        tap((category) => {
          this.groupCategories(category);
        })
      );
  }

  public groupCategories(categories) {
    var groups = new Set(categories.map((item) => item.type));
    groups.forEach((g) =>
      this.categoriesGrouped.push({
        name: g,
        subItems: categories.filter((i) => i.type === g),
      })
    );
    this.storageService.setLocalStorageCategories(this.categoriesGrouped);
  }

  // Launchs

  findByUserIdAndMonthAndType(
    userId: string,
    month?: string,
    type?: string
  ): Observable<User[]> {
    if (type) {
      return this.http.get<User[]>(
        `${this.url}/launch/findByUserIdAndMonthAndType?userId=${userId}&month=${month}&type=${type}`,
        {
          headers: this.token,
        }
      );
    }
    return this.http.get<User[]>(
      `${this.url}/launch/findByUserIdAndMonthAndType?userId=${userId}&month=${userId}`,
      {
        headers: this.token,
      }
    );
  }

  atualizarCarrinhoObservable(): Observable<any> {
    return this.atualizarCarrinhoSubject.asObservable();
  }

  atualizarCarrinho() {
    this.atualizarCarrinhoSubject.next();
  }

  gastos() {
    return [
      {
        tipo: "F",
        nome: "FIXAS",
        subItems: [
          {
            title: "Dízimos e Doações",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Aluguel / Prestação Habitacional",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Aluguel / Prestação Veículo",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Condomínio",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "IPTU + Taxas Municipais",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Conta de energia",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Conta de água",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Conta de gás",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Telefone fixo",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Telefones celulares",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Internet",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "TV por assinatura",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Supermercado",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Feira",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Padaria",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Empregados",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Lavanderia",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Plano de Saúde",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Médicos e terapeutas",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Dentista",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "IPVA + Seguro Obrigatório",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Seguro",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Combustível",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Estacionamentos",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Lavagens",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Mecânico",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Multas",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Ônibus",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Metrô",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Trem",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Táxi/Uber",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Cosméticos",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Salão de Beleza",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Vestuário",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Academia",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Esportes",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Cartões de Crédito (anuidades)",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Mesadas",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Escola / Faculdade",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Cursos",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Ensino à Distância",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Material escolar",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Uniformes",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Cartão de Crédito",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Saques Bancários",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
        ],
      },
      {
        tipo: "V",
        nome: "VARIÁVEIS",
        subItems: [
          {
            title: "Ida ao Restaurante",
            desc:
              "Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil",
          },
          {
            title: "Cafés, bares e boates",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Livraria, jornais e revistas",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Games",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Mídias e acessórios",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Passagens",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Hospedagens",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Passeios",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Curso de  Idiomas",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Manutenção e reparos",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Médicos e terapeutas esporádicos",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Dedetização",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Gastos de férias",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Correio",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Utilidades domésticas e decoração",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Manutenção Veículo",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
        ],
      },
      {
        tipo: "I",
        nome: "INVESTIMENTOS",
        subItems: [
          {
            title: "Poupança",
            desc:
              "Empresas idôneas. Há um termo de responsabilidade de dados cadastrais de acordo com o Art. 171 do Código Penal e Art. 884 do Código Civil",
          },
          {
            title: "Fundo de Investimento",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Reserva Para Viagem",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
          {
            title: "Reserva Para Curso / Treinamento",
            desc:
              "Mais alcance e menos esforço. Todo processo de compra e venda é realizado sem precisar de telefone ou e-mail para realizar cotações e faturar os pedidos",
          },
        ],
      },
    ];
  }
}